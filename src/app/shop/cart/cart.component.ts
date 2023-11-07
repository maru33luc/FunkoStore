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


  constructor(private cartService: CartService,
    private funkoService: FunkosService) {
      
    }

    ngOnInit() {
      this.cartService.obtenerCarrito().subscribe(async (items) => {
        this.cartItems = items;
        // Copiar elementos para trabajar con la copia local
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
    
    if (item.quantity < 99) { // Limita la cantidad a 99, ajusta según tus necesidades
      item.quantity++;
      this.cartService.agregarAlCarrito(item.funkoId, 1);
    }
  }

  decreaseQuantity(item: any) {
    
    if (item.quantity > 0) {
      item.quantity--;
      this.cartService.agregarAlCarrito(item.funkoId, -1);
    }
  }

  calculateTotalPrice(item: any): number {
    // Implementa la lógica para calcular el precio total del artículo
    return item.price * item.quantity;
  }

  removeItem(item: any) {
    // Implementa la lógica para eliminar un artículo del carrito
    this.cartService.agregarAlCarrito(item.funkoId, -item.quantity);
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
  }

  getTotalQuantity(): number {
    // Implementa la lógica para obtener la cantidad total de elementos en el carrito
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    // Implementa la lógica para calcular el subtotal del carrito
    return this.cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  }

  getTotalPrice(): number {
    // Implementa la lógica para calcular el precio total (incluyendo el envío si es necesario)
    return this.getSubtotal();
  }
}
