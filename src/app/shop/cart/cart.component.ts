import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';
import { CartLocalService } from 'src/app/services/cart-local.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  cartItemsCopy: any[] = [];
  quantityChanges: { funkoId: number; quantity: number }[] = [];

  constructor(private cartService: CartService,
    private funkoService: FunkosService,
    private loginService: LoginService,
    private cartLocalService: CartLocalService) {}

    ngOnInit() {

      this.loginService.authStateObservable()?.subscribe(async(user) => {
        if (user) {
          this.cartService.obtenerCarrito().subscribe(async (items) => {
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
    }
  
    async loadFunkoDetails() {
      for (const item of this.cartItemsCopy) {
         try {
           const funko = await this.funkoService.getFunko(item.funkoId);
           if (funko) {
             item.name = funko.name;
             item.price = funko.price;
             item.imageSrc = funko.frontImage;
             item.licence = funko.serie;
           } else {
             console.log('Item not found:', item);
           }
         } catch (error) {
           console.error('Error loading details for item:', item, error);
         }
      }
     }

  increaseQuantity(item: any) {
    if (item.quantity < 99) {
      item.quantity++;
      this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      this.quantityChanges.push({ funkoId: item.funkoId, quantity: item.quantity });
    }
  }

  saveChangesToDatabase() {
    console.log(this.quantityChanges);
    this.cartService.actualizarCantidades(this.quantityChanges);
  }

  calculateTotalPrice(item: any): number {
    return item.price * item.quantity;
  }

  removeItem(item: any) {
    this.cartService.eliminarDelCarrito(item.funkoId);
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
  }
  
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    console.log(this.cartItemsCopy);
    return this.cartItemsCopy.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.getSubtotal();
  }
}
