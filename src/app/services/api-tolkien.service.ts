import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiTolkienService {

  url:string = 'https://the-one-api.dev/v2/character';

  constructor() { }

  async getCharacterInfo(name:string){
    
  }
}
