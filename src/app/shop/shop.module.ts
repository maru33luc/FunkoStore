import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CollectionComponent } from './collection/collection.component';
import { ItemComponent } from './item/item.component';
import { ShopAsideComponent } from './shop-aside/shop-aside.component';
import { ShopMainComponent } from './shop-main/shop-main.component';
import { SliderGlideComponent } from './slider-glide/slider-glide.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { AuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';


@NgModule({
  declarations: [
    CartComponent,
    CollectionComponent,
    SliderGlideComponent,
    ShopPageComponent,
    ShopAsideComponent,
    ShopMainComponent,
    ItemPageComponent,
    CartPageComponent,
    ItemComponent,
    TermsPageComponent,
    ContactPageComponent,
    AboutUsPageComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    AuthModule, 
    FormsModule
  ],
  exports: [
    CollectionComponent,
    SliderGlideComponent,
    ShopAsideComponent,
    ShopMainComponent,
    ItemComponent,
    CartPageComponent,
  ]
})
export class ShopModule { }
