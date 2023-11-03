import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  template: `
  <div #hambIcon></div>
`,
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

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