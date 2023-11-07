import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';

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
    private funkoService: FunkosService) {}

    ngOnInit() {
      this.cartService.obtenerCarrito().subscribe(async (items) => {
        this.cartItems = items;
        this.cartItemsCopy = this.cartItems.map(item => ({ ...item }));
        await this.loadFunkoDetails();
        console.log(this.cartItemsCopy);
      });
    }
  
    async loadFunkoDetails() {
      for (const item of this.cartItemsCopy) {
         console.log('Loading details for item:', item);
         try {
           const funko = await this.funkoService.getFunko(item.funkoId);
           if (funko) {
             item.name = funko.name;
             item.price = funko.price;
             item.imageSrc = funko.frontImage;
             item.licence = funko.serie;
             console.log('Details loaded for item:', item);
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
