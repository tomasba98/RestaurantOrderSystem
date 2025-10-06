import type { Product } from '../entities/Product';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  description?: string;
  isAvailable?: boolean;
}

export interface IProductRepository {
  getAll(params?: PaginationParams): Promise<PaginatedResponse<Product>>;
  getById(id: string): Promise<Product>;
  getAvailable(): Promise<Product[]>;
  create(data: CreateProductData): Promise<Product>;
  update(id: string, data: UpdateProductData): Promise<Product>;
  delete(id: string): Promise<void>;
  toggleAvailability(id: string): Promise<Product>;
}