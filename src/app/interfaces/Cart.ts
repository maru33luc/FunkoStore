export interface Cart {
    id?: number; // ID del carrito (opcional si se generará automáticamente)
    clientId: number; // ID del cliente asociado al carrito
    funkos: FunkoCart[]; // Un arreglo de objetos que representan los Funkos en el carrito
  }

  export interface FunkoCart {
    funkoId: number; // ID del Funko
    quantity: number; // Cantidad de este Funko en el carrito
  }

  