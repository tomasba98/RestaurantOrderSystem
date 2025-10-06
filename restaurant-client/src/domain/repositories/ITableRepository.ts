import type { Table } from "../entities/Table";

export interface CreateTableData {
    number: number;
    x: number;
    y: number;
    isOccupied: boolean;
  }
  
  export interface UpdateTableData {
    x?: number;
    y?: number;
    isOccupied?: boolean;
  }
  
  export interface ITableRepository {
    getAll(): Promise<Table[]>;
    getById(id: string): Promise<Table>;
    getAvailable(): Promise<Table[]>;
    create(data: CreateTableData): Promise<Table>;
    update(id: string, data: UpdateTableData): Promise<Table>;
    delete(id: string): Promise<void>;
    setOccupation(id: string, isOccupied: boolean): Promise<boolean>;
  }