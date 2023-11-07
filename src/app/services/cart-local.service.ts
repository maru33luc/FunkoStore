import { Injectable } from '@angular/core';
import { FunkoCart } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartLocalService {
  private dbName = 'cartDB';
  private dbVersion = 1;
  private cartStoreName = 'cartItems';

  private db: IDBDatabase | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(this.cartStoreName)) {
        db.createObjectStore(this.cartStoreName, { keyPath: 'funkoId' });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event) => {
      console.error('Error opening indexedDB:', (event.target as IDBOpenDBRequest).error);
    };
  }

  async addToCart(item: { funkoId: number; quantity: number }) {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
  
    const transaction = this.db.transaction(this.cartStoreName, 'readwrite');
    const store = transaction.objectStore(this.cartStoreName);

    const existingItemRequest = store.get(item.funkoId);
    const existingItem = await new Promise<FunkoCart>((resolve, reject) => {
      existingItemRequest.onsuccess = () => resolve(existingItemRequest.result);
      existingItemRequest.onerror = () => reject(existingItemRequest.error);
    });

    if (existingItem) {
      existingItem.quantity += item.quantity;
      await store.put(existingItem);
      console.log(existingItem);
    } else {
      await store.add(item);
    }
 }

     
  async removeFromCart(funkoId: number) {
    if (!this.db) return;

    const transaction = this.db.transaction(this.cartStoreName, 'readwrite');
    const store = transaction.objectStore(this.cartStoreName);

    try {
      await store.delete(funkoId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  async getCart(): Promise<{ funkoId: number; quantity: number }[]> {
    if (!this.db) return [];
  
    const transaction = this.db.transaction(this.cartStoreName, 'readonly');
    const store = transaction.objectStore(this.cartStoreName);
  
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getCartItemFromDatabase(funkoId: number): Promise<FunkoCart | undefined> {
    if (!this.db) return undefined;
    const transaction = this.db.transaction(this.cartStoreName, 'readonly');
    const store = transaction.objectStore(this.cartStoreName);
    
    const request = store.get(funkoId);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  
  }
