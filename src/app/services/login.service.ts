import { Funko } from './../interfaces/Funko';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Firestore, collection } from 'firebase/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Route } from '@angular/router';
import { FunkoCart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) {}

  async register(email: string, password: string, nombre: string, apellido: string) {
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = response.user;
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const payload = {
        nombre: nombre,
        apellido: apellido,
        carrito: [] as FunkoCart[]
      }
      const docSnap = await setDoc(docRef, payload);
      return response;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async login(email: string, password: string) {
    try{
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log("login exitoso");
      console.log(user);
      this.getDataActualUser();

    }catch(error){
      console.log(error);
    }
  }

  async getDataActualUser() {
    const user = getAuth().currentUser;
    console.log(user);
    if (user) {
      try{
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
      }
      catch(error){
        console.log(error);
      }
    }
  }

  async logout() {
    try{
      await this.auth.signOut();
      console.log("logout exitoso");
    }catch(error){
      console.log(error);
    }
  }

  async update (nombre: string, apellido: string, carrito: FunkoCart[]) {
    const user = getAuth().currentUser;
    if (user) {
      try{
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const payload = {
          nombre: nombre,
          apellido: apellido,
          carrito: carrito
        }
        const docSnap = await setDoc(docRef, payload);
        console.log(docSnap);
      }
      catch(error){
        console.log(error);
      }
    }
  }
}
