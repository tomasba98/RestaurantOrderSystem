import type { EntityBase, Table, Order, OrderResponse } from "./index";

export interface TableSession extends EntityBase {
    tableId: string;
    table: Table;
    isActive: boolean;
    endTime?: string;
    orders: Order[];
  }
  
  export interface SessionRequest {
    tableId: string;
  }
  
  export interface SessionResponse {
    tableId: string;
    isActive: boolean;
    endTime?: string;
    orders: OrderResponse[];
  }
  