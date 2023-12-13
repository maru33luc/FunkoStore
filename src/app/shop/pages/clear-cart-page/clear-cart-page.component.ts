import { CartLocalService } from 'src/app/services/cart-local.service';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-clear-cart-page',
    templateUrl: './clear-cart-page.component.html',
    styleUrls: ['./clear-cart-page.component.css']
})
export class ClearCartPageComponent {
    constructor(private cartLocalService: CartLocalService,
        private cartService: CartService,
        private loginService: LoginService,
        private router: Router) {

        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.cartService.vaciarCarrito(user.uid);
            } else {
                this.cartLocalService.clearCart();
            }
        });
        setTimeout(() => {
            this.router.navigate(['/home']);
        }, 2000);

    }
}
