import type { EntityBase } from "./entityBase";

export interface Product extends EntityBase {
    name: string;
    price: number;
    description?: string;
    isAvailable: boolean;
  }

export interface ProductRequest {
    name: string;
    price: number;
    description?: string;
    isAvailable: boolean;
  }
  
  export interface ProductResponse {
    id: string;
    name: string;
    price: number;
    description?: string;
    isAvailable: boolean;
  }