import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';
import type { Order, OrderStatus } from '../entities/Order';

export interface OrderDetailItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderData {
  tableId: string;
  items: OrderDetailItem[];
}

export interface IOrderRepository {
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order>;
  getByTable(tableId: string): Promise<Order[]>;
  getBySession(sessionId: string): Promise<Order[]>;
  getByStatus(status: OrderStatus): Promise<Order[]>;
  create(data: CreateOrderData): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
  cancel(id: string): Promise<Order>;
  markReady(id: string): Promise<Order>;
}

