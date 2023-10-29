import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  template: `
    <div #hambIcon></div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  ngOnInit(): void {
    
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
  

 

  
}
