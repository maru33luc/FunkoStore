import { CartLocalService } from 'src/app/services/cart-local.service';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-clear-cart-page',
    templateUrl: './clear-cart-page.component.html',
    styleUrls: ['./clear-cart-page.component.css']
})
export class ClearCartPageComponent {
    constructor(private cartLocalService: CartLocalService,
        private cartService: CartService,
        private loginService: LoginService) {

        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                setTimeout(() => {
                    this.cartService.vaciarCarrito(user.uid);
                }, 400);
            } else {
                setTimeout(() => {
                    this.cartLocalService.clearCart();
                }, 400);
            }
        });


    }
}
