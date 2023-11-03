import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiTolkienService {

  url:string = 'https://the-one-api.dev/v2/character';
  token:string = 'wZyG4hBq4wxlOy_YH1hL';
  constructor() { }

  async getCharacterInfo(name: string) {
    try {
      const response = await axios.get(`${this.url}?name=${name}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        alert('Error en la solicitud' + response.status);
      }
    } catch (error) {
      alert ('Error en la solicitud' + error);
    }
  }
}
