import { FunkosService } from 'src/app/services/funkos.service';
import { Auth, user } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FunkoCart } from '../interfaces/Cart';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: FunkoCart[] = [];
    cartSubject: BehaviorSubject<FunkoCart[]> = new BehaviorSubject(this.cart);
    diferenciaCantidad: number = 0;
    fkCambiadoId: number | undefined = 0;
    valoresPrevios: { funkoId: number; quantity: number }[] = [];

    constructor(private loginService: LoginService, private funkoService: FunkosService,
        private auth: Auth) {

        //Suscripcion a cambios de estado de autenticacion    
        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.obtenerCarritoDeCompras(user.uid);
            }
        });
        //Suscripcion a cambios en el carrito
        this.cartSubject.subscribe((cart) => {
            this.cart = cart;
            this.valoresPrevios = [];
            for (const item of this.cart) {
                this.valoresPrevios.push({ funkoId: item.funkoId, quantity: item.quantity });
            }
        });
    }

    async obtenerCarritoDeCompras(userId: string) {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'users', userId);
            const docSnap = await getDoc(docRef);
            const cartData = docSnap.data()?.['carrito'] || {};
            this.cart = cartData as FunkoCart[];
            this.cartSubject.next(this.cart);
            return this.cart;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async agregarAlCarrito(funkoId: number, quantity: number) {
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                try {
                    if (typeof funkoId === 'number' && typeof quantity === 'number') {
                        if (user) {

                            if (this.cart) {
                                const existingCartItemIndex = this.cart.findIndex((item: FunkoCart) => item.funkoId === funkoId);
                                if (existingCartItemIndex !== -1) {
                                    this.cart[existingCartItemIndex].quantity += quantity;
                                    this.cartSubject.next(this.cart);
                                } else {
                                    this.cart.push({ funkoId, quantity });
                                    this.cartSubject.next(this.cart);
                                }
                                const db = getFirestore();
                                const docRef = doc(db, 'users', user.uid);
                                await updateDoc(docRef, {
                                    carrito: this.cart
                                });
                                return this.cart;
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    return error;
                }
            } return undefined
        });
    }

    async actualizarCantidades(cambiosDeCantidad: { funkoId: number; quantity: number }[]) {
        const user = this.auth.currentUser;
        if (user) {
            try {
                const db = getFirestore();
                const docRef = doc(db, 'users', user.uid);
                for (const cambio of cambiosDeCantidad) {
                    const cartItem = this.cart.find((item) => item.funkoId === cambio.funkoId);
                    if (cartItem) {
                        cartItem.quantity = cambio.quantity;
                    }
                }
                await updateDoc(docRef, {
                    carrito: this.cart
                });
                // Actualizar el stock después de haber actualizado las cantidades en el carrito
                for (const cambio of cambiosDeCantidad) {
                    this.diferenciaCantidad = 0;
                    const fk = this.cart.filter((item) => item.funkoId === cambio.funkoId);
                    const valorPrevio = this.valoresPrevios.find((item) => item.funkoId === cambio.funkoId);
                    this.diferenciaCantidad = cambio.quantity - valorPrevio!.quantity;
                    const cartItem = this.cart.find((item) => item.funkoId === cambio.funkoId);
                    if (cartItem) {
                        let stock = await this.funkoService.obtenerStockFunko(cartItem.funkoId);
                        stock ? (stock -= this.diferenciaCantidad) : (stock = 0);
                        if (stock === 0 && this.diferenciaCantidad <= 0) {
                            stock -= this.diferenciaCantidad;
                        }

                        const fk = await this.funkoService.getFunko(cartItem.funkoId);
                        if (fk) {
                            fk.stock = stock ? stock : 0;
                            await this.funkoService.putFunko(fk, fk.id);
                            this.fkCambiadoId = fk.id;
                        }
                    }
                }
                this.cartSubject.next(this.cart);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async eliminarDelCarrito(funkoId: number) {
        const user = this.auth.currentUser;
        if (user) {
            try {
                const db = getFirestore();
                const docRef = doc(db, 'users', user.uid);
                this.cart = this.cart.filter((item) => item.funkoId !== funkoId);
                await updateDoc(docRef, {
                    carrito: this.cart
                });
                this.cartSubject.next(this.cart);
            } catch (error) {
                console.error(error);
            }
        }
        else {
            this.cart = this.cart.filter((item) => item.funkoId !== funkoId);
            this.cartSubject.next(this.cart);
        }
    }
}