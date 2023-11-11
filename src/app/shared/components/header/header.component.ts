import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    template: `<div #hambIcon></div>`,
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;
    username: string = '';
    user$: Observable<any> | undefined;

    @ViewChild('hambIcon') hambIcon!: ElementRef;
    @ViewChild('navBar') navBar!: ElementRef;

    constructor(private loginService: LoginService) { }

    ngOnInit() {
        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });

        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.loginService.getUserName().then((nombre) => {
                    if (nombre) {
                        this.username = nombre.toUpperCase();
                    }
                });
            }
        });
    }

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
    }
}