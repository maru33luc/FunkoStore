import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    template: `<div #hambIcon></div>`,
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
    @ViewChild('hambIcon') hambIcon!: ElementRef;
    @ViewChild('navBar') navBar!: ElementRef;

    constructor (
        private loginService: LoginService,
        private router: Router
    ) {}

    ngAfterViewInit() {
        if (this.hambIcon) {
            this.hambIcon.nativeElement.addEventListener('click', () => {
                this.navBar.nativeElement.classList.toggle('header-navbar-menu');
                this.navBar.nativeElement.classList.toggle('header-navbar-dropdown-menu');
            });
        }
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/home']);
    }
}