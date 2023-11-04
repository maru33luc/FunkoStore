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

  onOrderChange() {
    this.orderService.setOrderType(this.orderType);
    console.log(this.orderType);
  }

  onSearch() {
    this.funkoService.filterFunkosByName(this.searchQuery);
  }

  onSearchChange(query: string) {
    this.orderService.setSearchQuery(query);
  }

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
