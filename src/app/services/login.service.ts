import { Injectable } from '@angular/core';
import {
    Auth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider,
    sendPasswordResetEmail
} from '@angular/fire/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { FunkoCart } from '../interfaces/Cart';
import { Observable, Subject, observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private authState$: Observable<any> | undefined;
    private providerGoogle = new GoogleAuthProvider();
    public username$ = new Subject<string>();

    constructor(private auth: Auth, private router: Router) {
        this.initialize();
        // Crea un observable personalizado para el estado de autenticación
        this.authState$ = new Observable((observer) => {
            this.auth.onAuthStateChanged(observer);
        });

        this.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.getDataActualUser().then((data: any) => { 
                    const nombre = data.nombre;
                    this.username$.next(nombre);
                });
            }
        });
    }

    private initialize(): void {
        window.addEventListener('unload', this.onUnload.bind(this));
    }

    // Define un método para obtener el observable del estado de autenticación
    authStateObservable(): Observable<any> | undefined {
        return this.authState$;
    }

    async register(email: string, password: string, nombre: string, apellido: string, telefono: string, direccion: string) {
        try {
            const response = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = response.user;
            const db = getFirestore();
            const docRef = doc(db, 'users', user.uid);
            const payload = {
                nombre: nombre,
                apellido: apellido,
                teléfono: telefono,
                dirección: direccion,
                carrito: [] as FunkoCart[],
                favoritos: [] as number[],
                isAdmin: false
            }
            const docSnap = await setDoc(docRef, payload);
            return response;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password);
            this.getDataActualUser();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, this.providerGoogle);
            const user = result.user;
            console.log('user', user);
            const nombre = user.displayName?.split(' ')[0];
            const apellido = user.displayName?.split(' ')[1];
            const db = getFirestore();
            const docRef = doc(db, 'users', user.uid);

            // Verificar si el documento ya existe
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                // El documento no existe, entonces podemos crear el payload
                const payload = {
                    nombre: nombre,
                    apellido: apellido,
                    teléfono: '',
                    dirección: '',
                    carrito: [] as FunkoCart[],
                    favoritos: [] as number[],
                    isAdmin: false
                }
                await setDoc(docRef, payload);
            }
            // Obtener y mostrar la información del usuario
            this.getDataActualUser();

            // Redirigir al home si todo resulta bien
            this.router.navigateByUrl('/home');
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async logout() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }

    getUser() {
        this.getDataActualUser().then((user) => {
            if (user) {
                return user;
            } return null;
        })
    }

    async getDataActualUser() {
        const user = getAuth().currentUser;
        if (user) {
            try {
                const db = getFirestore();
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                return docSnap.data();
            }
            catch (error) {
                console.log(error);
                return error;
            }
        } return null;
    }

    private onUnload(): void {
        this.logout();
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

    async updateUserData(
        nombre: string,
        apellido: string,
        telefono: string,
        direccion: string
    ) {
        const user = getAuth().currentUser;
        if (user) {
            try {
                const db = getFirestore();
                const docRef = doc(db, 'users', user.uid);
                const payload = {
                    nombre: nombre,
                    apellido: apellido,
                    teléfono: telefono,
                    dirección: direccion,
                };
                await updateDoc(docRef, payload);
                this.username$.next(nombre);
            } catch (error) {
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

    async resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento de contraseña', error);
            throw error;
        }
    }
}