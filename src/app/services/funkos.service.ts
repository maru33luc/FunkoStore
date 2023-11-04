import { Injectable } from '@angular/core';
import { Funko } from '../interfaces/Funko';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunkosService {

  url: string = 'http://localhost:4000/funkos';
  private funkos: Funko[] = [];
  private filteredFunkos: Funko[] = [];

  // Creamos un observable para emitir los cambios en la lista filtrada
  private filteredFunkosSubject: Subject<Funko[]> = new Subject<Funko[]>();

  constructor() {
    this.getFunkos().then(data => {
      if (data) {
        this.funkos = data;
        this.filteredFunkos = data;
        this.filteredFunkosSubject.next(this.filteredFunkos);
      }
    });
  }

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
  
    // Esta función se encarga de aplicar el filtro de precio y emitir la lista filtrada
    filterFunkosByPrice(minPrice: number, maxPrice: number) {
      this.filteredFunkos = this.funkos.filter(funko => {
        const price = funko.price; 
        return price >= minPrice && price <= maxPrice;
      });
      // Emitimos la lista filtrada a través del observable
      this.filteredFunkosSubject.next(this.filteredFunkos);
    }
  
    // Agregamos una función para obtener el observable de la lista filtrada
    getFilteredFunkosObservable(): Observable<Funko[]> {
      return this.filteredFunkosSubject.asObservable();
    }
  
  
}