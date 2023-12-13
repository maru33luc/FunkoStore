import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthEditDataGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.loginService.authStateObservable()!.pipe(
            map(user => {
                    if (user) {
                        return true;
                    } else {
                        this.router.navigate(['home']);
                        return false;
                    }
                })
        );
    }
}