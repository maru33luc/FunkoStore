import { NgModule } from '@angular/core';

import { CollectionComponent } from './collection/collection.component';
import { SliderGlideComponent } from './slider-glide/slider-glide.component';
import { ShopAsideComponent } from './shop-aside/shop-aside.component';
import { ShopMainComponent } from './shop-main/shop-main.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

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
        ItemComponent],
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