import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditFunkoPageComponent } from './pages/admin-edit-funko-page/admin-edit-funko-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminNewFunkoPageComponent } from './pages/admin-new-funko-page/admin-new-funko-page.component';


const routes: Routes = [
  { path: '' , component: AdminMainPageComponent},
  { path: "admin-new-funko", component: AdminNewFunkoPageComponent },
  { path: "admin-edit-funko/:id", component: AdminEditFunkoPageComponent },
  { path: "**", redirectTo: " " }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
