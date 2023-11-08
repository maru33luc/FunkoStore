import { Component, OnInit } from '@angular/core';
import Glide from '@glidejs/glide';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
title: string = 'ULTIMOS LANZAMIENTOS';

constructor(private loginService:LoginService) { 
  
}

  async ngOnInit() {
    // const resp = this.loginService.isUserLoggedIn();
    // console.log(resp);
    // const isAdmin = await  this.loginService.isAdmin();
    // console.log(isAdmin);
  }
  }

