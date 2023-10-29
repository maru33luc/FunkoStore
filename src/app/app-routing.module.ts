import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop/shop-page/shop-page.component';

import { AdminMainPageComponent } from './pages/admin/admin-main-page/admin-main-page.component';
import { AdminNewFunkoPageComponent } from './pages/admin/admin-new-funko-page/admin-new-funko-page.component';
import { AdminEditFunkoPageComponent } from './pages/admin/admin-edit-funko-page/admin-edit-funko-page.component';
import { ItemPageComponent } from './pages/shop/item-page/item-page.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "shop", component: ShopPageComponent },
  { path: "shop/:id", component: ItemPageComponent},
  { path: "admin-main", component: AdminMainPageComponent },
  { path: "admin-new-funko", component: AdminNewFunkoPageComponent },
  { path: "admin-edit-funko/:id", component: AdminEditFunkoPageComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
