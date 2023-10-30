import { Injectable } from '@angular/core';
import axios from 'axios';
import { Client } from '../interfaces/Client'; // Make sure the path is correct and matches the location of your interface

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = 'http://localhost:4000/clients'; // Ensure the URL matches the location of your json-server

  constructor() { }

  async getClients(): Promise<Client[] | undefined> {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  async getClient(id: number | undefined): Promise<Client | undefined> {
    try {
      const response = await axios.get(`${this.url}/${id}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  async createClient(client: Client | undefined) {
    try {
      const response = await axios.post(this.url, client);
    } catch (e) {
      console.log(e);
    }
  }

  async updateClient(client: Client, id: number | undefined) {
    try {
      const response = await axios.put(`${this.url}/${id}`, client);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteClient(id: number | undefined) {
    try {
      const response = await axios.delete(`${this.url}/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async getClientByEmail(email: string | undefined): Promise<Client | undefined> {
    try {
      const response = await axios.get(`${this.url}?email=${email}`);
      if (response.data.length > 0) {
        return response.data[0];
      }
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }


  async getClientIdByEmail(email: string | undefined): Promise<number | undefined> {
    try {
      const response = await axios.get(`${this.url}?email=${email}`);
      if (response.data.length > 0) {
        return response.data[0].id;
      }
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  // comprobar que ese cliente tiene la password correcta

  async getClientByEmailAndPassword(email: string | undefined, password: string | undefined): Promise<Client | undefined> {
    try {
      const response = await axios.get(`${this.url}?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        return response.data[0];
      }
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

}
