export interface Table {
    id: string;
    number: number;
    isOccupied: boolean;
    x: number;
    y: number;
    createdAt: string;
  }

  export interface TableRequest {
    number: number;
    isOccupied: boolean;
    x: number;
    y: number;
  }
  
  export interface TableResponse {
    id: string;
    number: number;
    isOccupied: boolean;
    x: number;
    y: number;
    createdAt: string;
  }
  
 export interface HallProps {
    width?: number;
    height?: number;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  }

 export interface DraggableTableProps {
    table: Table;
    onCreateOrder: (table: Table) => void;
    onToggleOccupied: (tableId: string) => void;
  }

export type CreateTable = Omit<Table, 'id' | 'createdAt'>;
export type UpdateTable = Partial<CreateTable>;