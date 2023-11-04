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
}
