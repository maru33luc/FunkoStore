import { Injectable } from '@angular/core';
import { Funko } from '../interfaces/Funko';
import axios from 'axios';

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

  async postFunko(funko: Funko | undefined) {
    try {
      const response = await axios.post(this.url, funko);
    }
    catch(e) {
      console.log(e);
    }
  }

  async putFunko(funko: Funko, id: number | undefined) {
    try {
      const response = await axios.put(`${this.url}/${id}`, funko);
    }
    catch(e) {
      console.log(e);
    }
  }

  async deleteFunko(id: number | undefined) {
    try {
      const response = await axios.delete(`${this.url}/${id}`);
    }
    catch(e) {
      console.log(e);
    }
  }

  async filterFunkosByName(name: string): Promise<Funko[] | undefined> {
    try {
      const response = await axios.get(this.url);
      const allFunkos = response.data as Funko[];
  
      // Si el nombre está vacío, devuelve todos los funkos
      if (!name) {
        return allFunkos;
      }
  
      // Filtra los funkos que contienen el nombre proporcionado
      const filteredFunkos = allFunkos.filter(funko => funko.name.toLowerCase().includes(name.toLowerCase()));
      return filteredFunkos;
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }
  

}