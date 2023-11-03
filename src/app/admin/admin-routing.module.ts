import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditFunkoPageComponent } from './pages/admin-edit-funko-page/admin-edit-funko-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { AdminNewFunkoPageComponent } from './pages/admin-new-funko-page/admin-new-funko-page.component';

const routes: Routes = [
  { path: '' , component: AdminMainPageComponent },
  { path: 'new-funko', component: AdminNewFunkoPageComponent },
  { path: 'edit-funko/:id', component: AdminEditFunkoPageComponent },
  { path: 'new-funko/new-funko', redirectTo: 'new-funko' },
  { path: 'edit-funko/:id/new-funko', redirectTo: 'new-funko' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }