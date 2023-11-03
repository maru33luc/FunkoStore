import { Funko } from './../interfaces/Funko';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Firestore, collection } from 'firebase/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Route } from '@angular/router';
import { FunkoCart } from '../interfaces/Cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authState$: Observable<any> | undefined;

  constructor(private auth: Auth) { 
    // Crea un observable personalizado para el estado de autenticación
    this.authState$ = new Observable((observer) => {
      this.auth.onAuthStateChanged(observer);
    });
  }

  // Define un método para obtener el observable del estado de autenticación
  authStateObservable(): Observable<any> | undefined {
    return this.authState$;
  }

  async register(email: string, password: string, nombre: string, apellido: string) {
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = response.user;
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const payload = {
        nombre: nombre,
        apellido: apellido,
        carrito: [] as FunkoCart[],
        isAdmin: false
      }
      const docSnap = await setDoc(docRef, payload);
      return response;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log("login exitoso");
      this.getDataActualUser();

    } catch (error) {
      console.log(error);
    }
  }

  async getDataActualUser() {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async getUserName() {
    const user = getAuth().currentUser;
    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data()?.['nombre'];
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      console.log("logout exitoso");
    } catch (error) {
      console.log(error);
    }
  }

  async updateDataUser(nombre: string, apellido: string, carrito: FunkoCart[]) {
    const user = getAuth().currentUser;
    if (user) {
      try {
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
      catch (error) {
        console.log(error);
      }
    }
  }

  isUserLoggedIn(): boolean {
    const user = getAuth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  getInfoUsuarioLogueado() {
    this.authStateObservable()?.subscribe((user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });
  }

  isAdmin(): Observable<boolean> {
    return new Observable((observer) => {
      this.authStateObservable()?.subscribe((user) => {
        if (user) {
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          getDoc(docRef)
            .then((docSnap) => {
              if (docSnap.data()?.['isAdmin']) {
                observer.next(true);
              } else {
                observer.next(false);
              }
              observer.complete(); 
            })
            .catch((error) => {
              observer.error(error); 
            });
        } else {
          observer.next(false);
          observer.complete(); 
        }
      });
    });
  }
  

}
