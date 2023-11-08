import { NgModule } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { AbousUsComponent } from './components/abous-us/abous-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsComponent } from './components/terms/terms.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AbousUsPageComponent } from './pages/abous-us-page/abous-us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';

import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { ShopModule } from '../shop/shop.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        HeroComponent,
        AbousUsComponent,
        ContactComponent,
        TermsComponent,    
        HomePageComponent,
        AbousUsPageComponent,
        ContactPageComponent,
        TermsPageComponent
    ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        ShopModule,
        SharedModule
    ]
})
export class LandingPageModule { }