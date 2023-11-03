import { ApiTolkienService } from './../../services/api-tolkien.service';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterApi } from 'src/app/interfaces/CharacterApi';
import { Funko } from 'src/app/interfaces/Funko';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements AfterViewInit {
  selectedItem: Funko | undefined;
  characterInfo: CharacterApi | undefined;

  @ViewChild('addButton') addButton: ElementRef | undefined;
  @ViewChild('subtractButton') subtractButton: ElementRef | undefined;
  @ViewChild('quantityButton') quantityButton: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private funkosService: FunkosService,
    private cartService: CartService,
    private apiTolkienService: ApiTolkienService
  ) {}

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

      // Una vez que tengas el Funko, obtén la información del personaje de Tolkien
      if (this.selectedItem && this.selectedItem.name) {
        const response = await this.apiTolkienService.getCharacterInfo(this.selectedItem.name);
        if (response && response.docs && response.docs.length > 0) {
          this.characterInfo = response.docs[0];
        }
        console.log(this.characterInfo);
        
      }

      return this.selectedItem;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  async addToCart() {
    let carrito = await this.cartService.obtenerCarritoDeCompras();
    if (this.selectedItem && this.quantityButton) {
      const quantity = parseInt(this.quantityButton.nativeElement.value);
      if (quantity > 0) {
        if (this.selectedItem.id) {
          this.cartService.agregarAlCarrito(this.selectedItem.id, quantity);
        }
        this.quantityButton.nativeElement.value = "0";
      }
    }
    carrito = await this.cartService.obtenerCarritoDeCompras();
    console.log(carrito);
  }
}
