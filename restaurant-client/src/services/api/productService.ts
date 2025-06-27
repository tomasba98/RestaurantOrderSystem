import type { PaginationParams, ApiResponse, PaginatedResponse, ProductRequest, ProductResponse } from '@/types';
import apiClient from '../axiosConfig';

const productService = {
    getAll: async (params?: PaginationParams): Promise<PaginatedResponse<ProductResponse>> => {
      const response = await apiClient.get<PaginatedResponse<ProductResponse>>('/products', { params });
      return response.data;
    },

    getAvailable: async (): Promise<ProductResponse[]> => {
      const response = await apiClient.get<ApiResponse<ProductResponse[]>>('/products/available');
      return response.data.data!;
    },

    getById: async (id: string): Promise<ProductResponse> => {
      const response = await apiClient.get<ApiResponse<ProductResponse>>(`/products/${id}`);
      return response.data.data!;
    },

    create: async (product: ProductRequest): Promise<ProductResponse> => {
      const response = await apiClient.post<ApiResponse<ProductResponse>>('/products', product);
      return response.data.data!;
    },

    update: async (id: string, product: Partial<ProductRequest>): Promise<ProductResponse> => {
      const response = await apiClient.put<ApiResponse<ProductResponse>>(`/products/${id}`, product);
      return response.data.data!;
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/products/${id}`);
    },

    toggleAvailability: async (id: string): Promise<ProductResponse> => {
      const response = await apiClient.patch<ApiResponse<ProductResponse>>(`/products/${id}/toggle-availability`);
      return response.data.data!;
    }
  };

  export default productService;