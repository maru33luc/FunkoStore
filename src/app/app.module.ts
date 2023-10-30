import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeroComponent } from './components/shop/hero/hero.component';
import { CollectionComponent } from './components/shop/collection/collection.component';
import { SliderGlideComponent } from './components/shop/slider-glide/slider-glide.component';
import { ShopPageComponent } from './pages/shop/shop-page/shop-page.component';
import { ShopAsideComponent } from './components/shop/shop-aside/shop-aside.component';
import { ShopMainComponent } from './components/shop/shop-main/shop-main.component';
import { ItemPageComponent } from './pages/shop/item-page/item-page.component';
import { ItemComponent } from './components/shop/item/item.component';

import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';
import { AdminNewFunkoComponent } from './components/admin/admin-new-funko/admin-new-funko.component';
import { AdminEditFunkoComponent } from './components/admin/admin-edit-funko/admin-edit-funko.component';
import { AdminMainPageComponent } from './pages/admin/admin-main-page/admin-main-page.component';
import { AdminNewFunkoPageComponent } from './pages/admin/admin-new-funko-page/admin-new-funko-page.component';
import { AdminEditFunkoPageComponent } from './pages/admin/admin-edit-funko-page/admin-edit-funko-page.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HeroComponent,
    CollectionComponent,
    SliderGlideComponent,
    ShopPageComponent,
    ShopAsideComponent,
    ShopMainComponent,
    ItemPageComponent,
    ItemComponent,
    AdminMainComponent,
    AdminFormComponent,
    AdminNewFunkoComponent,
    AdminEditFunkoComponent,
    AdminMainPageComponent,
    AdminNewFunkoPageComponent,
    AdminEditFunkoPageComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }