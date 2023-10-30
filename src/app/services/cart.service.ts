import { Injectable } from '@angular/core';
import axios from 'axios';
import { Cart } from '../interfaces/Cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = 'http://localhost:4000/carts';

  constructor() { }

  async getCartByClientId(clientId: number | undefined): Promise<Cart | undefined> {
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

  async createCart(clientId: number) {
    const existingCart = await this.getCartByClientId(clientId);
    
    if (!existingCart) {
      try {
        const newCart = { clientId, funkos: [] };
        const response = await axios.post(this.url, newCart);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('El cliente ya tiene un carrito.');
    }
  }

  async updateCart(cart: Cart, id: number | undefined) {
    try {
      const response = await axios.put(`${this.url}/${id}`, cart);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCart(clientId: number | undefined) {
    try {
      const cart = await this.getCartByClientId(clientId);
      if (cart) {
        const response = await axios.delete(`${this.url}/${cart.id}`);
      }
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
}
