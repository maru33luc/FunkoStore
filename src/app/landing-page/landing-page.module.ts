import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HeroComponent } from './hero/hero.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShopModule } from '../shop/shop.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeroComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ShopModule,
    SharedModule
  ]
})
export class LandingPageModule { }
