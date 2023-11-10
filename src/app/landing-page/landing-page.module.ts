import { NgModule } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsComponent } from './components/terms/terms.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';

import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { ShopModule } from '../shop/shop.module';
import { SharedModule } from '../shared/shared.module';
import { CollectionComponent } from './components/collection/collection.component';


@NgModule({
    declarations: [
        HeroComponent,
        AboutUsComponent,
        ContactComponent,
        TermsComponent,    
        HomePageComponent,
        AboutUsPageComponent,
        ContactPageComponent,
        TermsPageComponent,
        CollectionComponent
    ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        ShopModule,
        SharedModule
    ]
})
export class LandingPageModule { }