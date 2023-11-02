import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor( private router: Router, private fb: FormBuilder, private loginService: LoginService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  async register(){
    try{
      const response = await this.loginService.register(this.registerForm.value.email, this.registerForm.value.password, 
        this.registerForm.value.name, this.registerForm.value.lastname)
      console.log(response);
      this.router.navigateByUrl('/login');
    }catch(error){
      console.log(error);
    }
    
  }




}
