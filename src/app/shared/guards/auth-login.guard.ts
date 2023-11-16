import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.loginService.authStateObservable()!.pipe(
            take(1), // Toma solo un valor y se desuscribe
            map(user => {
                if (user) {
                    // El usuario está logueado, redirige a la página de inicio o a donde desees
                    this.router.navigate(['home']);
                    return false;
                } else {
                    return true;
                }
            })
        );
    }
}