import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PotterApiService {
  url = 'https://potterhead-api.vercel.app/api/characters';

  constructor() { }

  async getCharacterInfo(name: string) {
    try {
      const response = await axios(this.url);
      const data = response;
      const character = data.data.filter((character: { name: string; }) => character.name === name);
      if (character.length === 0) {
        return undefined;
      }
      return character[0];
    } catch (error) {
      alert('Error en la solicitud' + error);
      return undefined;
    }
  }
}
