export interface Order {
    id: string;
    tableId: string;
    status: OrderStatus;
    productList: OrderDetail[];
    tableSessionId: string;
    totalAmount: number;
    totalAmountHistory: number;
    createdAt: string;
  }
  
  export interface OrderDetail {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    createdAt: string;
  }
  
  export enum OrderStatus {
    Confirmed = 'Confirmed',
    InKitchen = 'InKitchen',
    Ready = 'Ready',
    Served = 'Served',
    Paid = 'Paid',
    Canceled = 'Canceled'
  }