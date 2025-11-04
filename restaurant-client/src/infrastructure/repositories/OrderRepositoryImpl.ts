import type { Order } from '@/domain/entities/Order';
import type {   IOrderRepository,   CreateOrderData, } from '@/domain/repositories/IOrderRepository';
import { apiClient } from '../http/ApiClient';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export class OrderRepositoryImpl implements IOrderRepository {
  private readonly basePath = '/order';

  async getAll(): Promise<Order> {
    return await apiClient.get<Order>(this.basePath);
  }

  async getById(id: string): Promise<Order> {
    return await apiClient.get<Order>(`${this.basePath}/${id}`);    
  }

  async getByTable(tableId: string): Promise<Order[]> {
    return await apiClient.get<Order[]>(`${this.basePath}/table/${tableId}`);    
  }

  async getBySession(sessionId: string): Promise<Order[]> {
    return await apiClient.get<Order[]>(`${this.basePath}/session/${sessionId}`);    
  }

  async create(data: CreateOrderData): Promise<Order> {
    return await apiClient.post<Order>(this.basePath, data);    
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    return await apiClient.patch<Order>(`${this.basePath}/${id}/status`, { status });    
  }

  async cancel(id: string): Promise<Order> {
    return await apiClient.patch<Order>(`${this.basePath}/${id}/cancel`);    
  }

  async getKitchenQueue(): Promise<Order[]> {
    return await apiClient.get<Order[]>(`${this.basePath}/kitchen/queue`);    
  }

  async markReady(id: string): Promise<Order> {
    return await apiClient.patch<Order>(`${this.basePath}/${id}/ready`);    
  }
}