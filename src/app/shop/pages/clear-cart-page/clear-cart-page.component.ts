import { CartLocalService } from 'src/app/services/cart-local.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-clear-cart-page',
    templateUrl: './clear-cart-page.component.html',
    styleUrls: ['./clear-cart-page.component.css']
})
export class ClearCartPageComponent { 
    constructor(private cartLocalService: CartLocalService) { 

        setTimeout(() => {
            this.cartLocalService.clearCart();
        }, 400);
    }
}
