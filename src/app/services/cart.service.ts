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
    private cartSubject: BehaviorSubject<FunkoCart[]> = new BehaviorSubject(this.cart);

    constructor(private loginService: LoginService,
        private auth: Auth) {
        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.obtenerCarritoDeCompras(user.uid);
            } else {
                this.clearCart();
                console.log('no hay usuario logueado');
            }
        });
      console.log(this.cart);
    }

    obtenerCarrito(): BehaviorSubject<FunkoCart[]> {
        return this.cartSubject;
    }

    clearCart() {
        this.cart = [];
        this.cartSubject.next(this.cart);
    }

    async obtenerCarritoDeCompras(userId: string) {
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                try {
                    const db = getFirestore();
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    const cartData = docSnap.data()?.['carrito'] || {};
                    this.cart = cartData as FunkoCart[];
                    this.cartSubject.next(this.cart);
                    console.log("OBTENIENDO CARRITO:", this.cart);
                    return this.cart;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            } else {
                console.log("no hay usuario logueado");
                return undefined;
            }
        });
    }

    async agregarAlCarrito(funkoId: number, quantity: number) {
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                try {
                    if (typeof funkoId === 'number' && typeof quantity === 'number') {
                        if (user) {

                            console.log(this.cart);
                            // Buscar si ya existe un Funko con el mismo funkoId en el carrito
                            if (this.cart) {
                                const existingCartItemIndex = this.cart.findIndex((item: FunkoCart) => item.funkoId === funkoId);
                                console.log(existingCartItemIndex);
                                console.log(funkoId);
                                if (existingCartItemIndex !== -1) {
                                    this.cart[existingCartItemIndex].quantity += quantity;
                                    console.log(this.cart);
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
      
            // Actualiza la copia local del carrito
            for (const cambio of cambiosDeCantidad) {
              const cartItem = this.cart.find((item) => item.funkoId === cambio.funkoId);
      
              if (cartItem) {
                cartItem.quantity = cambio.quantity;
              }
            }
      
            // Actualiza la base de datos con la copia local actualizada
            await updateDoc(docRef, {
              carrito: this.cart
            });
      
            // Notifica a los suscriptores sobre los cambios en el carrito
            this.cartSubject.next(this.cart);
          } catch (error) {
            console.error(error);
          }
        }
      }
      
}