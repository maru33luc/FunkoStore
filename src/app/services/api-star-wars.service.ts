import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class ApiStarWarsService {
    url: string = 'https://starwars-databank-server.vercel.app/api/v1/characters/name/';

    constructor() { }

  async getCharacterInfo(name: string) {
    try {
      const response = await axios(`${this.url}${name}`);
      const data = response.data;
      if (data === undefined) {
        return undefined;
      }
      return data[0];
    } catch (error) {
      alert('Error en la solicitud' + error);
    }
    return undefined;
  }

}
