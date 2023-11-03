import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  template: `
    <div #hambIcon></div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  
isLoggedIn: boolean = false;
username: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.authStateObservable()?.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        
      } else {
        this.isLoggedIn = false;
      }
      
    });
    this.obtenerNombreUsuario();
  }

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
  }
  
  obtenerNombreUsuario() {
    this.loginService.getUserName().then((nombre) => {
      if (nombre) {
        this.username = nombre.toUpperCase();
      }
    });
  }
  

 

  
}
