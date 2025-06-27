import type { EntityBase } from "./entityBase";

export interface Table extends EntityBase {
    number: number;
    isOccupied: boolean;
  }
export interface TableRequest {
    number: number;
    isOccupied: boolean;
  }
  
  export interface TableResponse {
    id: string;
    number: number;
    isOccupied: boolean;
  }

export type CreateTable = Omit<Table, 'id' | 'createdAt'>;
export type UpdateTable = Partial<CreateTable>;