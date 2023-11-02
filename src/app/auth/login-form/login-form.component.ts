import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor( private router: Router, private fb: FormBuilder,
     private loginService:LoginService, private cartService: CartService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      remember: [false]
    });
  }

  async login() {
    try {
      await this.loginService.login(this.loginForm.value.email, this.loginForm.value.password);
      this.router.navigateByUrl('/');
      const carritoActual = await this.cartService.obtenerCarritoDeCompras();
      console.log(carritoActual);
    } catch (error) {
      console.error(error);
    }
  }
  
}
