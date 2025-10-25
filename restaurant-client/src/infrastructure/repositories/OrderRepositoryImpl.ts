import type { Order } from '@/domain/entities/Order';
import type { 
  IOrderRepository, 
  CreateOrderData, 
} from '@/domain/repositories/IOrderRepository';
import { apiClient } from '../http/ApiClient';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export class OrderRepositoryImpl implements IOrderRepository {
  private readonly basePath = '/order';

  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Order>> {
    return await apiClient.get<PaginatedResponse<Order>>(this.basePath, { params });
  }

  async getById(id: string): Promise<Order> {
    const response = await apiClient.get<{ data: Order }>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getByTable(tableId: string): Promise<Order[]> {
    const response = await apiClient.get<{ data: Order[] }>(`${this.basePath}/table/${tableId}`);
    return response.data;
  }

  async getBySession(sessionId: string): Promise<Order[]> {
    const response = await apiClient.get<{ data: Order[] }>(`${this.basePath}/session/${sessionId}`);
    return response.data;
  }

  async create(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<{ data: Order }>(this.basePath, data);
    return response.data;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const response = await apiClient.patch<{ data: Order }>(`${this.basePath}/${id}/status`, { status });
    return response.data;
  }

  async cancel(id: string): Promise<Order> {
    const response = await apiClient.patch<{ data: Order }>(`${this.basePath}/${id}/cancel`);
    return response.data;
  }

  async getKitchenQueue(): Promise<Order[]> {
    const response = await apiClient.get<{ data: Order[] }>(`${this.basePath}/kitchen/queue`);
    return response.data;
  }

  async markReady(id: string): Promise<Order> {
    const response = await apiClient.patch<{ data: Order }>(`${this.basePath}/${id}/ready`);
    return response.data;
  }
}