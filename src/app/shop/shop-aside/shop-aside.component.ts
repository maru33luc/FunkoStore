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
    this.destildarCheckbox('category');
    this.destildarCheckbox('saga');
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
      this.funkoService.undoFilters();
    }
  }

  onLicenceChange(event: Event, licence: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.orderService.setLicenceQuery(licence);
    } else {
      this.orderService.setLicenceQuery('');
      this.funkoService.undoFilters();
    }
  }

  onPriceFilterChange() {
    console.log(this.minPrice, this.maxPrice);
    if (this.maxPrice >= 0 && this.maxPrice >= this.minPrice) {
      this.orderService.setMinPrice(this.minPrice);
      this.orderService.setMaxPrice(this.maxPrice);
      this.funkoService.aplicarFiltro("price", "",this.minPrice, this.maxPrice);
    }
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
    if (isNaN(this.minPrice)) {
      this.minPrice = 0;
    }
  }

  resetMaxPricePlaceholder() {
    if (isNaN(this.maxPrice)) {
      this.maxPrice = 0;
    }
  }

  clearFilters() {
    this.searchQuery = '';
    this.orderType = 'az';
    this.minPrice = 0;
    this.maxPrice = 0;
    this.orderService.setSearchQuery('');
    this.orderService.setOrderType('az');
    this.orderService.setCategoryQuery('');
    this.orderService.setLicenceQuery('');
    this.funkoService.showAllFunkos();
    this.funkoService.clearAllFilters();  
    this.limpiarCheckboxes('category');
    this.limpiarCheckboxes('saga');
  }

  limpiarCheckboxes(nameInput: string) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="' + nameInput + '"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = false;
    });
  }

  destildarCheckbox(nameInput: string) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="' + nameInput + '"]');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const inputCheckbox = checkbox as HTMLInputElement;

        if (inputCheckbox.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });
  }
}
