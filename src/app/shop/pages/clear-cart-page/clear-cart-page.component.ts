import { CartLocalService } from 'src/app/services/cart-local.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-clear-cart-page',
    templateUrl: './clear-cart-page.component.html',
    styleUrls: ['./clear-cart-page.component.css']
})
export class ClearCartPageComponent {
    countdown: number = 4;

    constructor(
        private cartLocalService: CartLocalService,
        private cartService: CartService,
        private loginService: LoginService,
        private router: Router
    ) {
        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.cartService.vaciarCarrito(user.uid);
            } else {
                this.cartLocalService.clearCart();
            }
        });
        // setTimeout(() => {
        //     this.router.navigate(['/home']);
        // }, 5000);
    }

    ngOnInit() {
        AOS.init();
        this.startCountdown();        
    }

    startCountdown() {
        const interval = setInterval(() => {
            this.countdown--;

            if (this.countdown <= 0) {
                clearInterval(interval);
                this.redirectToHome();
            }
        }, 1000);
    }

    redirectToHome() {
        this.router.navigate(['/home']);
    }

    getCountdownMessage(): string {
        return `Volviendo a la tienda en ${this.countdown} segundos...`;
    }
}