export interface TableDTO {
    id: string;
    number: number;
    isOccupied: boolean;
    x: number;
    y: number;
    createdAt: string;
  }
  
  export interface CreateTableDTO {
    number: number;
    x: number;
    y: number;
    isOccupied: boolean;
  }
  
  export interface UpdateTableDTO {
    x?: number;
    y?: number;
    isOccupied?: boolean;
  }
  
  export interface TableStateDTO {
    tables: TableDTO[];
    isLoading: boolean;
    error: string | null;
  }