import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';

import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { TermsComponent } from './components/terms/terms.component';
import { ContactComponent } from './components/contact/contact.component';
import { AbousUsComponent } from './components/abous-us/abous-us.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        IfAuthenticatedDirective,
        TermsComponent,
        ContactComponent,
        AbousUsComponent,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        IfAuthenticatedDirective,
        TermsComponent,
    ]
})
export class SharedModule {}