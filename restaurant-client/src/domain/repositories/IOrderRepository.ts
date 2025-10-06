import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';
import type { Order } from '../entities/Order';

export interface OrderDetailItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  tableId: string;
  items: OrderDetailItem[];
}

export interface IOrderRepository {
  getAll(params?: PaginationParams): Promise<PaginatedResponse<Order>>;
  getById(id: string): Promise<Order>;
  getByTable(tableId: string): Promise<Order[]>;
  getBySession(sessionId: string): Promise<Order[]>;
  create(data: CreateOrderData): Promise<Order>;
  updateStatus(id: string, status: string): Promise<Order>;
  cancel(id: string): Promise<Order>;
  getKitchenQueue(): Promise<Order[]>;
  markReady(id: string): Promise<Order>;
}

