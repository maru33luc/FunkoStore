import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(
            {
                "projectId": "funkostore-b44e7",
                "appId": "1:599703726366:web:dc176fcc201097bd2fc10f",
                "storageBucket": "funkostore-b44e7.appspot.com",
                "apiKey": "AIzaSyDtU1Rdh5mZXb5OFL9KWJetYtfi8hcJfE0",
                "authDomain": "funkostore-b44e7.firebaseapp.com",
                "messagingSenderId": "599703726366",
                "measurementId": "G-QFY4FKRWLQ"
            })),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AngularFireModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }