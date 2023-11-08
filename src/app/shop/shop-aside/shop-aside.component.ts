import { Component } from '@angular/core';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
  selector: 'app-shop-aside',
  templateUrl: './shop-aside.component.html',
  styleUrls: ['./shop-aside.component.css']
})
export class ShopAsideComponent {

  searchQuery: string = '';
  orderType: 'az' | 'za' | 'desc' | 'asc' = 'az';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private orderService: OrderFunkosService,
    private funkoService: FunkosService) { }

    ngOnInit() {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="category"]');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
          const inputCheckbox = checkbox as HTMLInputElement;
          if (inputCheckbox.checked) {
            checkboxes.forEach((otherCheckbox) => {
              if (otherCheckbox !== checkbox) {
                otherCheckbox.disabled = true; // Desactiva los otros checkboxes
              }
            });
          } else {
            checkboxes.forEach((otherCheckbox) => {
              otherCheckbox.disabled = false; // Activa los otros checkboxes
            });
          }
        });
      });
    }

  onOrderChange() {
    this.orderService.setOrderType(this.orderType);
  }

  onSearchChange(query: string) {
    this.orderService.setSearchQuery(query);
  }

  onCategoryChange(event: Event, serie: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.orderService.setCategoryQuery(serie);
    } else {
      this.orderService.setCategoryQuery(''); // Valor vacío si se desmarca
    }
  }
  

  // Funciones para el manejo de los placeholders de los inputs de precio  
  onPriceFilterChange() {
    if(this.maxPrice > 0  && this.maxPrice > this.minPrice)
      this.funkoService.filterFunkosByPrice(this.minPrice, this.maxPrice);
    if(this.maxPrice === 0 && this.minPrice == 0)
    this.funkoService.showAllFunkos();
    }  

  clearMinPricePlaceholder() {
    if (this.minPrice === 0) {
      this.minPrice = NaN;
    }
  }
  
  clearMaxPricePlaceholder() {
    if (this.maxPrice === 0) {
      this.maxPrice = NaN;
    }
  }
  
  resetMinPricePlaceholder() {
    if (this.minPrice === null) {
      this.minPrice = 0;
    }
  }
  
  resetMaxPricePlaceholder() {
    if (this.maxPrice === null) {
      this.maxPrice = 0;
    }
  }
}
