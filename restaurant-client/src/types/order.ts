import type { EntityBase, Product, Table, TableSession, OrderStatus } from "./index";


export interface Order extends EntityBase {
    tableId: string;
    table: Table;
    productList: OrderDetail[];
    status: OrderStatus;
    tableSessionId: string;
    tableSession: TableSession;
    totalAmount: number;
    totalAmountHistory: number;
}
export interface OrderDetail extends EntityBase {
    orderId: string;
    order: Order;
    productId: string;
    product: Product;
    quantity: number;
  }
export interface OrderDetailItem {
    productId: string;
    quantity: number;
  }
  
  export interface OrderRequest {
    tableId: string;
    items: OrderDetailItem[];
  }
  
  export interface OrderDetailResponse {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    tableSessionId: string;
  }
  
  export interface OrderResponse {
    id: string;
    tableId: string;
    createdAt: string;
    status: OrderStatus;
    productList: OrderDetailResponse[];
  }
  
  export interface OrderDetailRequest {
    productItems: OrderDetailItem[];
  }