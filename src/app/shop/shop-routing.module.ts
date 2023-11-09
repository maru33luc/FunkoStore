import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


const routes: Routes = [
    { path: '', component: ShopPageComponent },
    { path: ':id', component: ItemPageComponent },
    { path: 'cart', component: CartPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }