import type { Product } from '@/domain/entities/Product';
import type { 
  IProductRepository, 
  CreateProductData, 
  UpdateProductData,
} from '@/domain/repositories/IProductRepository';
import { apiClient } from '../http/ApiClient';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export class ProductRepositoryImpl implements IProductRepository {
  private readonly basePath = '/Product';

  async getAll(): Promise<Product[]> {
    //return await apiClient.get<PaginatedResponse<Product>>(this.basePath, { params });
    return await apiClient.get<Product[]>(this.basePath);
  }

  async getById(id: string): Promise<Product> {
    return await apiClient.get<Product>(`${this.basePath}/${id}`);
  }

  async getAvailable(): Promise<Product[]> {
    return await apiClient.get<Product[]>(`${this.basePath}/available`);
  }

  async create(data: CreateProductData): Promise<Product> {
    return await apiClient.post<Product>(this.basePath, data);   
  }

  async update(id: string, data: UpdateProductData): Promise<Product> {
    return await apiClient.put<Product>(`${this.basePath}/${id}`, data);    
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async toggleAvailability(id: string): Promise<Product> {
    return await apiClient.patch<Product>(`${this.basePath}/${id}/toggle-availability`);
  }
}
