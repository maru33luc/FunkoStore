import { CartLocalService } from './../../services/cart-local.service';
import { ApiTolkienService } from './../../services/api-tolkien.service';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterApiPokemon, CharacterApiPotter, CharacterApiStarWars, CharacterApiTolkien } from 'src/app/interfaces/CharacterApi';
import { Funko } from 'src/app/interfaces/Funko';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';
import { LoginService } from 'src/app/services/login.service';
import { PotterApiService } from 'src/app/services/api-potter.service';
import { ApiStarWarsService } from 'src/app/services/api-star-wars.service';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements AfterViewInit {
  selectedItem: Funko | undefined;
  characterInfo: CharacterApiTolkien | undefined;
  characterInfoPotter: CharacterApiPotter | undefined;
  characterInfoStarWars: CharacterApiStarWars | undefined;
  characterInfoPokemon: CharacterApiPokemon | undefined;
  isAuthenticated: boolean = false; 
  selectedItemLicence: string | undefined;

    @ViewChild('addButton') addButton: ElementRef | undefined;
    @ViewChild('subtractButton') subtractButton: ElementRef | undefined;
    @ViewChild('quantityButton') quantityButton: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private funkosService: FunkosService,
    private cartService: CartService,
    private apiTolkienService: ApiTolkienService,
    private loginService: LoginService,
    private cartLocalService: CartLocalService,
    private apiPotterService : PotterApiService,
    private apiStarWarsService : ApiStarWarsService,
    private apiPokemonService : ApiPokemonService
  ) {
    this.loginService.authStateObservable()?.subscribe((user) => {
      this.isAuthenticated = !!user; 
    });
  }

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

  // Funciones para el manejo de los placeholders de los inputs de precio
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

  // Funcion para obtener informacion de un funko por su id, obtener la informacion del personaje y filtrar por licencia
  async getItemById(itemId: number): Promise<Funko | undefined> {
    try {
      this.selectedItem = await this.funkosService.getFunko(itemId);
      this.selectedItemLicence = this.selectedItem?.licence;
      if (this.selectedItemLicence) {
        // this.funkosService.filterFunkosByLicence(this.selectedItemLicence);// Le avisa al servicio que filtre por licencia para obtener en el slider los relacionados
      }
      // Obtener informacion extra por API
      if (this.selectedItem && this.selectedItem.name) {
        if (this.selectedItem.licence === 'The Lord of the Rings') {
          const response = await this.apiTolkienService.getCharacterInfo(this.selectedItem.name);
          if (response && response.docs && response.docs.length > 0) {
            this.characterInfo = response.docs[0];
            console.log(this.characterInfo);
          }else if(response.docs.length === 0){
            this.characterInfo = undefined;
          }
        }
        else if (this.selectedItem.licence === 'Harry Potter'){          
          const response = await this.apiPotterService.getCharacterInfo(this.selectedItem.name);
          if (response ) {
            this.characterInfoPotter = response;
          }else{
            this.characterInfoPotter = undefined;
          }
        }
        else if (this.selectedItem.licence === 'Star Wars') {          
          const response = await this.apiStarWarsService.getCharacterInfo(this.selectedItem.name);
          if (response ) {
            this.characterInfoStarWars = response;
          }else{
            this.characterInfoStarWars = undefined;
          }
        }
        else if(this.selectedItem.licence === 'Pokemon'){
          const response = await this.apiPokemonService.getPokemon(this.selectedItem.id);
          console.log(this.selectedItem.id);
          if (response ) {
            this.characterInfoPokemon = response;
          }else{
            this.characterInfoPokemon = undefined;
          }
        }
      }
      return this.selectedItem;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async addToCart() {
    if (this.selectedItem && this.quantityButton) {
      const quantity = parseInt(this.quantityButton.nativeElement.value);
      if (quantity > 0) {
        if (this.selectedItem.id) {
          if (this.isAuthenticated) {
            this.cartService.agregarAlCarrito(this.selectedItem.id, quantity);
          } else {
            await this.cartLocalService.addToCart({ funkoId: this.selectedItem.id, quantity: quantity });
          }
          this.quantityButton.nativeElement.value = "0";
        }
      }
    }
  }
}