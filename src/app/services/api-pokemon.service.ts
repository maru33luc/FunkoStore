import { Injectable } from '@angular/core';
import axios from 'axios';
import { CharacterApiPokemon } from '../interfaces/CharacterApi';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {
  private url: string = 'http://localhost:4000/pokemon';

  constructor() { }

  async getPokemon(id: number | undefined): Promise<CharacterApiPokemon | undefined> {
    try {
        const response = await axios.get(`${this.url}/${id}`);
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
    return undefined;
}

}
