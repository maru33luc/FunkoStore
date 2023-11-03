import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FunkoCart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: FunkoCart[] = [];

  constructor() {
    this.obtenerCarritoDeCompras();
  }

  async obtenerCarritoDeCompras() {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const cartData = docSnap.data()?.['carrito'] || [];

        // Transforma cartData en un array de Funkos
        const cart = Object.keys(cartData).map((funkoid) => {
          return {
            funkoId: Number(funkoid), 
            quantity: cartData[funkoid].quantity
          };
        });
       
        this.cart = cart as FunkoCart[]; 
        return cart;

      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      console.log("no hay usuario logueado");
      return undefined;
    }
  }

  async agregarAlCarrito(funkoId: number, quantity: number) {
    if (typeof funkoId === 'number' && typeof quantity === 'number') {
      const user = getAuth().currentUser;
      if (user) {
        try {
          this.cart.push({ funkoId: funkoId, quantity: quantity } as FunkoCart);
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          await updateDoc(docRef, {
            carrito: this.cart
          });
          console.log(this.cart);
          return this.cart;

        } catch (error) {
          console.log(error);
          return error;
        }
      } return undefined;
    }return undefined;
  }
}
