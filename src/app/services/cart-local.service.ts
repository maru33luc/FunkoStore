import { Injectable } from '@angular/core';
import axios from 'axios';
import { Cart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = 'http://localhost:4000/carts';

  constructor() {
    // Registra el evento beforeunload para sincronizar el carrito con el servidor y eliminarlo de localStorage al cerrar el navegador.
    window.addEventListener('beforeunload', this.syncAndClearCartOnUnload.bind(this));
  }

  // Cargar el carrito al iniciar sesión
  async loadCart(clientId: number | undefined): Promise<Cart | undefined> {
    // Intenta cargar el carrito desde el servidor
    const cartFromServer = await this.getCartByClientId(clientId);

    if (cartFromServer) {
      // Actualiza el carrito en localStorage con la información del servidor
      localStorage.setItem(`cart_${clientId}`, JSON.stringify(cartFromServer));
    }

    return cartFromServer;
  }

  // Crear un carrito si no existe
  async createCart(clientId: number) {
    const existingCart = await this.getCartByClientId(clientId);

    if (!existingCart) {
      try {
        const newCart = { clientId, funkos: [] };
        const response = await axios.post(this.url, newCart);
        // Crea el carrito localmente
        localStorage.setItem(`cart_${clientId}`, JSON.stringify(newCart));
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('El cliente ya tiene un carrito.');
    }
  }

  // Sincronizar el carrito con el servidor y actualizar localStorage
  async syncCart(clientId: number | undefined, cart: Cart) {
    // Actualiza el carrito en el servidor
    await this.updateCartOnServer(clientId, cart);
    // Actualiza el carrito en localStorage
    localStorage.setItem(`cart_${clientId}`, JSON.stringify(cart));
  }

  // Eliminar el carrito de localStorage al cerrar la sesión o el navegador
  syncAndClearCartOnUnload() {
    const clientId = JSON.parse(localStorage.getItem('client') || '{}').id;
    const cartFromLocalStorage = JSON.parse(localStorage.getItem(`cart_${clientId}`) || 'null');

    if (cartFromLocalStorage) {
      // Sincroniza el carrito local con el servidor
      this.updateCartOnServer(clientId, cartFromLocalStorage);
      // Borra el carrito de localStorage
      localStorage.removeItem(`cart_${clientId}`);
    }
  }

  // Eliminar el carrito al pagar
  clearCartOnPayment(clientId: number | undefined) {
    localStorage.removeItem(`cart_${clientId}`);
  }

  private async getCartByClientId(clientId: number | undefined): Promise<Cart | undefined> {
    try {
      const response = await axios.get(`${this.url}?clientId=${clientId}`);
      if (response.data.length > 0) {
        return response.data[0];
      }
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  // Actualizar el carrito en el servidor
  private async updateCartOnServer(clientId: number | undefined, cart: Cart) {
    try {
      const existingCart = await this.getCartByClientId(clientId);
      if (existingCart) {
        const response = await axios.put(`${this.url}/${existingCart.id}`, cart);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
