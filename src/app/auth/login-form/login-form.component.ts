import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loginService: LoginService
    ) {}

    validate(field: string, error: string): boolean {
        return (
            this.loginForm.controls[field].getError(error) && 
            this.loginForm.controls[field].touched);
    }

    async login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
        } else {
            try {
                await this.loginService.login(
                    this.loginForm.value.email,
                    this.loginForm.value.password
                );
                if (this.loginService.isUserLoggedIn()) {
                    this.loginService.isAdmin().subscribe((isAdmin) => {
                        if (isAdmin) {
                            this.router.navigateByUrl('/admin');
                        } else {
                            this.router.navigateByUrl('/home');
                        }
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}