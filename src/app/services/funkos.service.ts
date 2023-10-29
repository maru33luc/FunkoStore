import { Injectable } from '@angular/core';
import axios from 'axios';
import { Funko } from '../interfaces/Funko';

@Injectable({
  providedIn: 'root'
})
export class FunkosService {

  url: string = 'http://localhost:4000/funkos';

  constructor() { }

  async getFunkos(): Promise<Funko[] | undefined> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    }
    catch(e) {
      console.log(e);
    }
    return undefined;
  }

  async getFunko(id: number | undefined): Promise<Funko | undefined> {
    try {
      const response = await axios.get(`${this.url}/${id}`);
      return response.data;
    }
    catch(e) {
      console.log(e);
    }
    return undefined;
  }

  async addFunko(funko: Funko | undefined) {
    try {
      const response = await axios.post(this.url, funko);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateFunko(funko: Funko | undefined) {
    try {
      const response = await axios.put(`${this.url}/${funko?.id}`, funko);
    }
    catch(e) {
      console.log(e);
    }
  }

  async deleteFunko(id: number | undefined) {
    try {
      const response = await axios.delete(`${this.url}/${id}`);
      window.location.reload();
    }
    catch(e) {
      console.log(e);
    }
  }

}