import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';


const routes: Routes = [
  { path: '', component: ShopPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: ':id', component: ItemPageComponent },
  { path: 'terms', component: TermsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'about-us', component: AboutUsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
