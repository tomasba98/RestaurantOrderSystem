import type { EntityBase } from "./entityBase";

export interface Table extends EntityBase {
    number: number;
    isOccupied: boolean; 
    x: number;
    y: number;
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
  
 export interface HallProps {
    width?: number;
    height?: number;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  }

export type CreateTable = Omit<Table, 'id' | 'createdAt'>;
export type UpdateTable = Partial<CreateTable>;