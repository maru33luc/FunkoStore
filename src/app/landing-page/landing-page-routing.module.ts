import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';
import { AbousUsPageComponent } from './pages/abous-us-page/abous-us-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    {path: 'nosotros', component: AbousUsPageComponent},
    {path: 'contacto', component: ContactPageComponent},
    {path: 'terminos', component: TermsPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule { }