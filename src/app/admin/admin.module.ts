import { NgModule } from '@angular/core';

import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminNewFunkoComponent } from './admin-new-funko/admin-new-funko.component';
import { AdminEditFunkoComponent } from './admin-edit-funko/admin-edit-funko.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminNewFunkoPageComponent } from './pages/admin-new-funko-page/admin-new-funko-page.component';
import { AdminEditFunkoPageComponent } from './pages/admin-edit-funko-page/admin-edit-funko-page.component';

import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AdminHeaderComponent,
        AdminMainComponent,
        AdminFormComponent,
        AdminNewFunkoComponent,
        AdminEditFunkoComponent,
        AdminMainPageComponent,
        AdminNewFunkoPageComponent,
        AdminEditFunkoPageComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AdminModule { }