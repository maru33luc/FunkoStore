import { NgModule } from '@angular/core';

import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from '../admin/admin.module';
import { EditDataUserComponent } from './components/edit-data-user/edit-data-user.component';
import { EditDataPageComponent } from './pages/edit-data-page/edit-data-page.component';


@NgModule({
    declarations: [
        RegisterFormComponent,
        LoginFormComponent,
        RegisterPageComponent,
        LoginPageComponent,
        EditDataUserComponent, 
        EditDataPageComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        AdminModule
    ]
})
export class AuthModule { }