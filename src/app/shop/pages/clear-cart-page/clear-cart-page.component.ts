import { CartLocalService } from 'src/app/services/cart-local.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';

@Component({
    selector: 'app-clear-cart-page',
    templateUrl: './clear-cart-page.component.html',
    styleUrls: ['./clear-cart-page.component.css']
})
export class ClearCartPageComponent {

    constructor(
        private cartLocalService: CartLocalService,
        private router: Router
    ) {
        setTimeout(() => {
            this.cartLocalService.clearCart();
            this.router.navigate(['/home']);
        }, 5000);
    }

    ngOnInit() {
        AOS.init();
    }
}