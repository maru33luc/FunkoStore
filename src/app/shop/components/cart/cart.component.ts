import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';
import { CartLocalService } from 'src/app/services/cart-local.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkoCart } from 'src/app/interfaces/Cart';

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


    constructor(
        private cartService: CartService,
        private funkoService: FunkosService,
        private loginService: LoginService,
        private cartLocalService: CartLocalService,
    ) { 
        
    }

    ngOnInit() {

        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                this.user = user;
                this.cartService.cartSubject.subscribe(async (items) => {
                    this.cartItems = items;
                    this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
                    await this.loadFunkoDetails();
                });
            } else {
                this.cartItems = await this.cartLocalService.getCart();
                this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
                this.loadFunkoDetails();
            }
        }
        );
        this.cartLocalService.cartSubject.subscribe(async (items) => {
            // this.cartItems = items;
            this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
            this.loadFunkoDetails();
            this.valoresPrevios = [];
            console.log('cartItems', this.cartItems);
            this.obtenerCarritoDeCompras();
            for (const item of this.cartItems) {
                this.valoresPrevios.push({ funkoId: item.funkoId, quantity: item.quantity });
            }
        });

        
    }

    async obtenerCarritoDeCompras() {
        this.cartItems = await this.cartLocalService.getCart();
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
                } else {
                    console.log('Item not found:', item);
                }
            } catch (error) {
                console.error('Error loading details for item:', item, error);
            }
        }
    }

    increaseQuantity(item: FunkoCart) {

        if (item.quantity < 99) {
            item.quantity++;
            if (!this.quantityChanges.find((change) => change.funkoId === item.funkoId)) {
                this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
            } else {
                const change = this.quantityChanges.find((change) => change.funkoId === item.funkoId);
                if (change) {
                    change.quantity++;
                }
            }
        }}

        decreaseQuantity(item: FunkoCart) {
            if (item.quantity > 0) {
                item.quantity--;
                if (!this.quantityChanges.find((change) => change.funkoId === item.funkoId)) {
                    this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
                }else {
                    const change = this.quantityChanges.find((change) => change.funkoId === item.funkoId);
                    if (change) {
                        change.quantity--;
                    }
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
                const fk = this.cartItems.find((item) => item.funkoId === change.funkoId);
                const valorPrevio = this.valoresPrevios.find((item) => item.funkoId === change.funkoId);
                
                if (valorPrevio) {
                    diferenciaCantidad = change.quantity - valorPrevio!.quantity;
                    
                    // Actualizar el stock aquí para usuarios no logueados
                    const stock = await this.funkoService.obtenerStockFunko(change.funkoId);
                    const nuevoStock = stock? stock - diferenciaCantidad : undefined;
                    await this.funkoService.obtenerStockFunko(change.funkoId);
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
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.user) {
                    this.cartService.eliminarDelCarrito(item.funkoId);
                    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
                } else {
                    this.cartLocalService.removeFromCart(item.funkoId);
                    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
                }
            }
        });
    }

        getTotalQuantity(): number {
            return this.cartItems.reduce((total, item) => total + item.quantity, 0);
        }

        getSubtotal(): number {
            return this.cartItemsCopy.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
        }

        getTotalPrice(): number {
            return this.getSubtotal();
        }
    }
