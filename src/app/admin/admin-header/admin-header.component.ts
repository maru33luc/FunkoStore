import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  template: `
  <div #hambIcon></div>
`,
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor (private loginService: LoginService, private router: Router) { }

  @ViewChild('hambIcon') hambIcon!: ElementRef;
  @ViewChild('navBar') navBar!: ElementRef;

  ngAfterViewInit(): void {
    if (this.hambIcon) {
      this.hambIcon.nativeElement.addEventListener('click', () => {
        this.navBar.nativeElement.classList.toggle('navbar__menu');
        this.navBar.nativeElement.classList.toggle('navbar__menu-toogle');
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

}