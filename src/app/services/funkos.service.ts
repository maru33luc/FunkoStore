import { Injectable } from '@angular/core';
import axios from 'axios';
import { Funko } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FunkosService {

  url: string = 'http://localhost:4000/funkos';

  constructor() { }

  async getFunkos() {
    try{
      const response = await axios.get(this.url);
      console.log(response.data);
      return response.data;
    }catch(e){
      console.log(e);
    }
  }

  async getFunko(id: string) {
    try{
      const response = await axios.get(`${this.url}/${id}`);
      return response.data;
    }catch(e){
      console.log(e);
    }
  }

  async addFunko(funko: Funko | undefined) {
    try{
      const response = await axios.post(this.url, funko);
      return response.data;
    }catch(e){
      console.log(e);
    }
  }

  async updateFunko(funko: Funko | undefined) {
    try{
      const response = await axios.put(`${this.url}/${funko?.id}`, funko);
      return response.data;
    }catch(e){
      console.log(e);
    }
  }

}
