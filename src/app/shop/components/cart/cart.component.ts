import { LoginService } from 'src/app/services/login.service';
import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';
import { CartLocalService } from 'src/app/services/cart-local.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FunkoCart } from 'src/app/interfaces/Cart';
import { PaymentService } from 'src/app/services/payment.service';

declare global {
    interface Window {
        paymentButton: HTMLElement | null;
        mercadoPagoBtn: HTMLElement | null;
    }
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cartItems: any[] = [];
    cartItemsCopy: any[] = [];
    quantityChanges: { funkoId: number; quantity: number }[] = [];
    user: Observable<any> | undefined;
    valoresPrevios: { funkoId: number; quantity: number }[] = [];
    loadingCart: boolean = true;
    

    constructor(
        private cartService: CartService,
        private funkoService: FunkosService,
        private loginService: LoginService,
        private cartLocalService: CartLocalService,
        private renderer: Renderer2,
    ) { }

    ngOnInit() {
        window.paymentButton = document.getElementById('payment');
        window.mercadoPagoBtn = document.getElementById('wallet_container');

        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                this.user = user;
                // await this.obtenerCart(user.uid);
                this.cartService.cartSubject.subscribe(async (items) => {
                    this.cartItems = items;
                    this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
                    await this.loadFunkoDetails();
                });
                this.loadingCart = false; // Después de cargar el carrito, ocultar el spinner
                this.cargarScript();
                setTimeout(() => {
                    this.renderizarBtnPago();
                }, 40);
            } else {
                this.user = undefined;
                this.cartItems = [];
                this.cartItemsCopy = [];
                // Mostrar el spinner mientras se carga el carrito local
                this.loadingCart = true;
                this.cartItems = await this.cartLocalService.getCart();
                this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
                this.valoresPrevios = [];
                for (const item of this.cartItemsCopy) {
                    this.valoresPrevios.push({ funkoId: item.funkoId, quantity: item.quantity });
                }
                await this.loadFunkoDetails();
                this.loadingCart = false;
                this.cargarScript();
            }
        }
        );

        this.cartLocalService.cartSubject.subscribe(async (items) => {
            this.cartItems = items;
            this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
            await this.loadFunkoDetails();
            setTimeout(() => {
                this.renderizarBtnPago();
            }, 40);
        });
    }

    renderizarBtnPago() {
        const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach((item) => {
                const btnAdd = item.querySelector('#add');
                const btnSubstract = item.querySelector('#substract');
    
                btnAdd?.addEventListener('click', () => {
                    localStorage.removeItem('script');
                    this.cargarScript();
                });
                btnSubstract?.addEventListener('click', () => {
                    localStorage.removeItem('script');
                    this.cargarScript();
                });
            });

    }

    ngOnDestroy() {
        window.paymentButton = null;
        window.mercadoPagoBtn = null;
        localStorage.removeItem('script');
    }

    cargarScript() {
        const script = this.renderer.createElement('script');
        script.src = 'assets/js/mercadopago.js';
        this.renderer.appendChild(document.body, script);
        localStorage.setItem('script', 'scriptCargado');
    }

    async obtenerCart(uid: string) {
        const res = await this.cartService.obtenerCarritoDeCompras(uid);
        if (res) {
            this.cartItems = res as FunkoCart[];
            this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
            this.valoresPrevios = [];
            for (const item of this.cartItemsCopy) {
                this.valoresPrevios.push({ funkoId: item.funkoId, quantity: item.quantity });
            }
            await this.loadFunkoDetails();
        }
    }

    async loadFunkoDetails() {
        for (const item of this.cartItemsCopy) {
            try {
                const funko = await this.funkoService.getFunko(item.funkoId);
                if (funko) {
                    item.name = funko.name;
                    item.price = funko.price;
                    item.imageSrc = funko.frontImage;
                    item.serie = funko.serie;
                    item.licence = funko.licence;
                    item.stock = funko.stock;
                } else {
                    console.log('Item not found:', item);
                }
            } catch (error) {
                console.error('Error loading details for item:', item, error);
            }
        }
    }

    async increaseQuantity(item: FunkoCart) {
        const funko = await this.funkoService.getFunko(item.funkoId);
        let stock = funko?.stock;
        if (stock && stock > 0) {
            item.quantity++;

            const foundItem = this.cartItemsCopy.find((items) => item.funkoId === items.funkoId);
            foundItem.stock--;

            if (!this.quantityChanges.find((change) => change.funkoId === item.funkoId)) {
                this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
                this.saveChangesToDatabase();
            } else {
                const change = this.quantityChanges.find((change) => change.funkoId === item.funkoId);
                if (change) {
                    change.quantity++;
                }
                this.saveChangesToDatabase();
            }
        }
    }

    async decreaseQuantity(item: FunkoCart) {
        const funko = await this.funkoService.getFunko(item.funkoId);
        let stock = funko?.stock;
        if (item.quantity > 1) {
            item.quantity--;
            const foundItem = this.cartItemsCopy.find((items) => item.funkoId === items.funkoId);
            foundItem.stock++;

            if (!this.quantityChanges.find((change) => change.funkoId === item.funkoId)) {
                this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
                this.saveChangesToDatabase();
            } else {
                const change = this.quantityChanges.find((change) => change.funkoId === item.funkoId);
                if (change) {
                    change.quantity--;
                }
                this.saveChangesToDatabase();
            }
        }
    }

    async saveChangesToDatabase() {
        if (this.user) {
            await this.cartService.actualizarCantidades(this.quantityChanges);

        } else {
            for (const change of this.quantityChanges) {
                const cartItem = this.cartItems.find(item => item.funkoId === change.funkoId);
                if (cartItem) {
                    cartItem.quantity = change.quantity;
                    await this.cartLocalService.updateCartItem({ funkoId: change.funkoId, quantity: change.quantity });
                }
            }
            // Actualizar el stock después de haber actualizado las cantidades en el carrito
            for (const change of this.quantityChanges) {
                let diferenciaCantidad = 0;
                const valorPrevio = this.valoresPrevios.find((item) => item.funkoId === change.funkoId)?.quantity;
                if (valorPrevio) {
                    diferenciaCantidad = change.quantity - valorPrevio;

                    // Actualizar el stock aquí para usuarios no logueados
                    const funko = await this.funkoService.getFunko(change.funkoId);
                    if (funko) {
                        funko.stock -= diferenciaCantidad;
                        await this.funkoService.putFunko(funko, funko.id);
                    }
                }
                // actualizar la nueva cantidad del item en valoresPrevios
                const valorPrevioActualizado = this.valoresPrevios.find((item) => item.funkoId === change.funkoId);
                if (valorPrevioActualizado) {
                    valorPrevioActualizado.quantity = change.quantity;
                }
            }
        }
        this.quantityChanges = [];
    }

    calculateTotalPrice(item: any): number {
        return item.price * item.quantity;
    }

    removeItem(item: any) {
        Swal.fire({
            text: "¿Está seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ELIMINAR",
            cancelButtonText: "CANCELAR"
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.user) {
                    this.cartService.eliminarDelCarrito(item.funkoId);
                    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
                    this.cartItemsCopy = this.cartItemsCopy.filter((cartItem) => cartItem !== item);

                    this.cartService.cartSubject.subscribe(async (items) => {
                        if (items.length === 0) {
                            // Verificar si el carrito está vacío y activar el evento
                            document.dispatchEvent(new Event('carritoVacioEvent'));
                            this.cartItems = [];
                            this.cartItemsCopy = [];
                        }
                    });

                } else {
                    this.cartLocalService.removeFromCart(item.funkoId);
                    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);

                    this.cartLocalService.cartSubject.subscribe(async (items) => {
                        if (items.length === 0) {
                            // Verificar si el carrito está vacío y activar el evento
                            if (this.cartItems.length === 0) {
                                document.dispatchEvent(new Event('carritoVacioEvent'));
                                this.cartItems = [];
                                this.cartItemsCopy = [];
                            }
                        }
                    });
                }
            }
        });
    }

    getTotalQuantity(): number {
        return this.cartItemsCopy.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal(): number {
        return this.cartItemsCopy.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
    }

    getTotalPrice(): number {
        return this.getSubtotal();
    }

}