import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
