import { Injectable } from '@angular/core';
import { Funko } from '../interfaces/Funko';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class FunkosService {
    private url: string = 'http://localhost:4000/funkos';
    private funkos: Funko[] = [];
    private filteredFunkos: Funko[] = [];
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
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async getFunko(id: number | undefined): Promise<Funko | undefined> {
        try {
            const response = await axios.get(`${this.url}/${id}`);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async postFunko(funko: Funko | undefined) {
        try {
            const response = await axios.post(this.url, funko);
        }
        catch (e) {
            console.log(e);
        }
    }

    async putFunko(funko: Funko, id: number | undefined) {
        try {
            const response = await axios.put(`${this.url}/${id}`, funko);
        }
        catch (e) {
            console.log(e);
        }
    }

    async deleteFunko(id: number | undefined) {
        try {
            const response = await axios.delete(`${this.url}/${id}`);
        }
        catch (e) {
            console.log(e);
        }
    }

    filterFunkosByName(searchQuery: string) {
        if (searchQuery.trim() === '') {
            this.showAllFunkos();
        } else {
            this.filteredFunkos = this.funkos.filter((funko) =>
                (funko.name || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
            this.filteredFunkosSubject.next(this.filteredFunkos);
        }
    }


    sortFunkos(orderType: string) {
        if (orderType === 'az') {
            this.filteredFunkos.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (orderType === 'za') {
            this.filteredFunkos.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        } else if (orderType === 'asc') {
            this.filteredFunkos.sort((a, b) => a.price - b.price);
        } else if (orderType === 'desc') {
            this.filteredFunkos.sort((a, b) => b.price - a.price);
        }
        this.filteredFunkosSubject.next(this.filteredFunkos);
    }

    filterFunkosByPrice(minPrice: number, maxPrice: number) {
        this.filteredFunkos = this.funkos.filter(funko => {
            const price = funko.price;
            return price >= minPrice && price <= maxPrice;
        });
        this.filteredFunkosSubject.next(this.filteredFunkos);
        console.log("SERVICE: " + this.filteredFunkos.length);
    }

    filterFunkosByCategory(serie: string) {
        if (serie.trim() === '') {
          this.showAllFunkos();
        } else {
          this.filteredFunkos = this.funkos.filter((funko) =>
            (funko.category == serie && typeof funko.category === 'string')
          );
          this.filteredFunkosSubject.next(this.filteredFunkos);
          console.log('Filtrado service', this.filteredFunkos);
        }
      }
      

    getFilteredFunkosObservable(): Observable<Funko[]> {
        return this.filteredFunkosSubject.asObservable();
    }

    showAllFunkos() {
        this.filteredFunkos = this.funkos;
        this.filteredFunkosSubject.next(this.filteredFunkos);
    }

    obtenerPrecioFunko (id: number): number | undefined {
        const funko = this.funkos.find(funko => funko.id === id);
        return funko?.price;
    }

    calcularPrecioTotal (funkoId: number, cantidad: number): number | undefined {
        const precioFunko = this.obtenerPrecioFunko(funkoId);
        return precioFunko ? precioFunko * cantidad : undefined;
    }
}
