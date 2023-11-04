import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
  selector: 'app-shop-main',
  templateUrl: './shop-main.component.html',
  styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit {
  lista: Funko[] = [];
  itemsPerPage = 9;
  currentPage = 0;
  pages: number[] = [];
  searchQuery: string = '';
  showPagination = true;
  lista$: Observable<Funko[]> | undefined;
  filteredFunkos$: Observable<Funko[]> | undefined; // Observable para Funkos filtrados por precio


  constructor(private funkoService: FunkosService,
    private orderService: OrderFunkosService) { }

  ngOnInit() {
    this.lista$ = this.funkoService.getFilteredFunkosObservable();
    this.filteredFunkos$ = this.funkoService.getFilteredFunkosObservable();    window.addEventListener('resize', () => {
      this.updateItemsPerPage();
    });

    this.orderService.orderType$.subscribe(orderType => {
      // Lógica de ordenamiento
      if (orderType === 'az') {
        this.lista.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      } else if (orderType === 'za') {
        this.lista.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      }
      else if (orderType === 'asc') {
        this.lista.sort((a, b) => a.price - b.price);
      } else if (orderType === 'desc') {
        this.lista.sort((a, b) => b.price - a.price);
      }
      this.calculateTotalPages();
    });

    this.orderService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.filterFunkos();
    });

     // Se subscribe a los cambios en los Funkos filtrados por precio y actualiza la lista
     this.filteredFunkos$.subscribe(filteredFunkos => {
      this.lista = filteredFunkos;
      if(this.lista.length === 0) {
        this.showPagination = false;
      }
      this.calculateTotalPages();
    });
  }

  filterFunkos() {
    if (this.searchQuery.trim() === '') {
      this.mostrarFunkos();
    } else {
      const filteredFunkos = this.lista.filter((funko) =>
        (funko.name || '').toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (filteredFunkos.length === 0) {
        // No se encontraron resultados, oculta la paginación.
        this.showPagination = false;
        this.lista = [];
      } else {
        // Se encontraron resultados, muestra la paginación y actualiza la lista.
        this.showPagination = true;
        this.lista = filteredFunkos;
        this.calculateTotalPages();
      }
    }
  }

  async mostrarFunkos() {
    const response = await this.funkoService.getFunkos();
    if (response != undefined) {
      this.lista = response as Funko[];
      this.calculateTotalPages();
    } else {
      console.log('Error al mostrar los funkos');
    }
  }

  calculateTotalPages() {
    this.pages = Array(Math.ceil(this.lista.length / this.itemsPerPage)).fill(0).map((_, i) => i);
  }

  get paginatedItems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.lista.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    if (newPage < 0) {
      this.currentPage = 0;
    } else if (newPage >= this.pages.length) {
      this.currentPage = this.pages.length - 1;
    } else {
      this.currentPage = newPage;
    }
    return false;
  }

  updateItemsPerPage() {
    if (window.innerWidth <= 1380 && window.innerWidth > 1045) {
      this.itemsPerPage = 6;
    } else if (window.innerWidth <= 1045 && window.innerWidth > 600) {
      this.itemsPerPage = 3;
    } else if (window.innerWidth <= 600) {
      this.itemsPerPage = 1;
    } else {
      this.itemsPerPage = 9;
    }
  }

  filterFunkosByPrice(minPrice: number, maxPrice: number) {
    this.funkoService.filterFunkosByPrice(minPrice, maxPrice);
  }
}
