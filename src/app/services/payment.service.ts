// app/payment/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080'; // Reemplaza con la URL de tu backend
  private publicKey = 'TEST-ad2a00a3-36b2-41ec-9cff-be4ea472b2e4'; // Reemplaza con tu propia clave pública


  constructor(private http: HttpClient) {}

  createPreference(price: number): Observable<any> {
    const orderData = { price };
    return this.http.post<any>(`${this.baseUrl}/create_preference`, orderData, {
        headers: {
            'Public-Key': this.publicKey,
          },
    });
  }
}
