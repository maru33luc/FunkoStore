import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FunkoCart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: FunkoCart[] = [];

  async obtenerCarritoDeCompras() {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const cartData = docSnap.data()?.['carrito'] || [];
        const cart = cartData.map((item: any) => {
          return {
            funkoid: item.funkoid,
            quantity: item.quantity
          };
        });
        console.log(cart);
        this.cart = cart;
        return cart;
      } catch(error) {
        console.log(error);
        return error;
      }
    } else {
      console.log("no hay usuario logueado");
      return undefined;
    }
  }

  async agregarAlCarrito(funkoId: number, quantity: number) {
    const user = getAuth().currentUser;
    if (user) {
      try {
        this.cart.push({funkoId: funkoId, quantity: quantity} as FunkoCart);
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          carrito: this.cart});
        console.log(this.cart);
        return this.cart;

      } catch(error) {
        console.log(error);
        return error;
      }
    }return undefined;
  }}
