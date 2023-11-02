import { Directive, ViewContainerRef, TemplateRef, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit {
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.authStateObservable()?.subscribe((authState) => {
      this.updateView(authState);
    });
  }

  private updateView(authState: any) {
    const isLoggedIn = this.loginService.isUserLoggedIn();

    if (isLoggedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
