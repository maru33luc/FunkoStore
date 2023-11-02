import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funko } from 'src/app/interfaces/Funko';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  selectedItem: Funko | undefined;
  @ViewChild('addButton') addButton: ElementRef | undefined;
  @ViewChild('subtractButton') subtractButton: ElementRef | undefined;
  @ViewChild('quantityButton') quantityButton: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
     private funkosService: FunkosService,
     private cartService: CartService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params['id']; 
      this.getItemById(itemId);
    });
  }

  ngAfterViewInit() {
    if (this.addButton && this.subtractButton && this.quantityButton) {
      this.addButton.nativeElement.addEventListener('click', () => this.handleAddClick());

      this.subtractButton.nativeElement.addEventListener('click', () => this.handleSubtractClick());
    }
  }

  private handleAddClick() {
    this.updateQuantity(1);
  }

  private handleSubtractClick() {
    this.updateQuantity(-1);
  }

  private updateQuantity(change: number) {
    if (this.quantityButton) {
      let quantityValue = this.quantityButton.nativeElement.value;
      
      if (quantityValue === "" || isNaN(quantityValue)) {
        quantityValue = "0";
      } else {
        quantityValue = (parseInt(quantityValue) + change).toString();
        if (parseInt(quantityValue) < 0) {
          quantityValue = "0";
        }
      }

      this.quantityButton.nativeElement.value = quantityValue;
    }
  }

  async getItemById(itemId: number): Promise<Funko | undefined> {
    try {
      this.selectedItem = await this.funkosService.getFunko(itemId);
    } catch (error) {
      console.log(error);
      return undefined;
    }
    return undefined;
  }
}
