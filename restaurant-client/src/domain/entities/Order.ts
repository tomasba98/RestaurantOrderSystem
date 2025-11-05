export interface Order {
    id: string;
    tableId: string;
    status: OrderStatus;
    productList: OrderDetail[];
    tableSessionId: string;
    tableNumber: string;
    totalAmount: number;
    totalAmountHistory: number;
    createdAt: string;
  }
  
  export interface OrderDetail {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    description: string;
    quantity: number;
    createdAt: string;
  }

  export enum OrderStatus {
    Confirmed = 0,
    InKitchen = 1,
    Ready = 2,
    Served = 3,
    Paid = 4,
    Canceled = 5
  }