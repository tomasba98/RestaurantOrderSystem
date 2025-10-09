import { OrderStatus } from '@/domain/entities/Order';

export interface OrderDTO {
  id: string;
  tableId: string;
  status: OrderStatus;
  productList: OrderDetailDTO[];
  tableSessionId: string;
  totalAmount: number;
  totalAmountHistory: number;
  createdAt: string;
}

export interface OrderDetailDTO {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: string;
}

export interface CreateOrderDTO {
  tableId: string;
  items: CreateOrderItemDTO[];
}

export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
}

export interface UpdateOrderStatusDTO {
  orderId: string;
  status: OrderStatus;
}

export interface OrderWithDetailsDTO extends OrderDTO {
  tableName?: string;
  productDetails?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
}

export interface OrderStateDTO {
  orders: OrderDTO[];
  currentOrder: OrderDTO | null;
  isLoading: boolean;
  error: string | null;
}

export interface KitchenQueueDTO {
  orders: OrderDTO[];
  totalOrders: number;
  updatedAt: string;
}