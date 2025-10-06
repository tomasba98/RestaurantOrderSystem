import type { Product } from '@/domain/entities/Product';
import type { 
  IProductRepository, 
  CreateProductData, 
  UpdateProductData,
} from '@/domain/repositories/IProductRepository';
import { apiClient } from '../http/apiClientInstance';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export class ProductRepositoryImpl implements IProductRepository {
  private readonly basePath = '/products';

  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return await apiClient.get<PaginatedResponse<Product>>(this.basePath, { params });
  }

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<{ data: Product }>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getAvailable(): Promise<Product[]> {
    const response = await apiClient.get<{ data: Product[] }>(`${this.basePath}/available`);
    return response.data;
  }

  async create(data: CreateProductData): Promise<Product> {
    const response = await apiClient.post<{ data: Product }>(this.basePath, data);
    return response.data;
  }

  async update(id: string, data: UpdateProductData): Promise<Product> {
    const response = await apiClient.put<{ data: Product }>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async toggleAvailability(id: string): Promise<Product> {
    const response = await apiClient.patch<{ data: Product }>(`${this.basePath}/${id}/toggle-availability`);
    return response.data;
  }
}
