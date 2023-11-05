import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
    private isRegisterError: boolean = false;

    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required]],
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loginService: LoginService,
    ) {}

    validate(field: string, error: string) {
        return (
            this.registerForm.controls[field].getError(error) && 
            this.registerForm.controls[field].touched);
    }

    validatePassword() {
        const password = this.registerForm.controls['password'].value;
        const repassword = this.registerForm.controls['repassword'].value;
        if (repassword.length === 0) {
            return false;
        }
        return (
            password !== repassword &&
            this.registerForm.controls['repassword'].touched);
    }

    async register() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
        } else {
            try {
                const response = await this.loginService.register(
                    this.registerForm.value.email,
                    this.registerForm.value.password,
                    this.registerForm.value.name,
                    this.registerForm.value.lastname
                );
                this.loginService.logout();
                this.router.navigateByUrl('/login/log');
                this.isRegisterError = true;
            } catch (e) {
                console.log(e);
                this.isRegisterError = false;
            }
        }
    }

}