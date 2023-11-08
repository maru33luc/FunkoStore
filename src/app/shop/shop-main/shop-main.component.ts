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
  filteredFunkos$: Observable<Funko[]> | undefined;
  minPrice: number = 0;
  maxPrice: number = 1000; // Valores iniciales de precio mínimo y máximo

  constructor(private funkoService: FunkosService, private orderService: OrderFunkosService) { }

  ngOnInit() {
    this.mostrarFunkos();
    this.lista$ = this.funkoService.getFilteredFunkosObservable();
    this.filteredFunkos$ = this.funkoService.getFilteredFunkosObservable();  

    window.addEventListener('resize', () => {
      this.updateItemsPerPage();
    });

    // Suscripción a cambios en el orden
    this.orderService.orderType$.subscribe(orderType => {
      this.funkoService.sortFunkos(orderType);
      this.currentPage = 0; // Reiniciar a la primera página después de cambiar el orden
      this.calculateTotalPages(); // Recalcular el número de páginas
    });

    // Suscripción a cambios en el filtro de búsqueda
    this.orderService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.funkoService.filterFunkosByName(query);
      this.currentPage = 0; 
      this.calculateTotalPages(); 
    });

    // Suscripción a cambios en el filtro de precio
    this.funkoService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
      this.lista = filteredFunkos;
      this.currentPage = 0; 
      this.calculateTotalPages(); 
      this.updatePaginationVisibility();
    });

    // Suscripción a cambios en el filtro de serie
    this.orderService.categoryQuery$.subscribe((serie) => {
      this.searchQuery = serie;
      this.funkoService.filterFunkosByCategory(serie);
      this.currentPage = 0; 
      this.calculateTotalPages(); 
    });
  }

  

    // ------------PAGINACION -------------------------------

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
        window.scrollTo(0, 0);
        return false;
    }

  updateItemsPerPage() {
    if (window.innerWidth <= 1380 && window.innerWidth > 1045) {
      this.itemsPerPage = 6;
    } else if (window.innerWidth <= 1045 && window.innerWidth > 600) {
      this.itemsPerPage = 4;
    } else if (window.innerWidth <= 600) {
      this.itemsPerPage = 1;
    } else {
      this.itemsPerPage = 9;
    }
  }

  updatePaginationVisibility() {
    if (this.filteredFunkos$ === undefined) {
      this.showPagination = false;
    } else if (this.lista.length === 0) {
      this.showPagination = false;
    } else {
      this.showPagination = true;
    }
  }

}
