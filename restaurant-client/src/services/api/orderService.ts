import type { PaginationParams, ApiResponse, PaginatedResponse, OrderRequest, OrderResponse } from '@/types';
import apiClient from '../axiosConfig';

const orderService = {
    getAll: async (params?: PaginationParams): Promise<PaginatedResponse<OrderResponse>> => {
      const response = await apiClient.get<PaginatedResponse<OrderResponse>>('/orders', { params });
      return response.data;
    },

    getByTable: async (tableId: string): Promise<OrderResponse[]> => {
      const response = await apiClient.get<ApiResponse<OrderResponse[]>>(`/orders/table/${tableId}`);
      return response.data.data!;
    },

    getBySession: async (sessionId: string): Promise<OrderResponse[]> => {
      const response = await apiClient.get<ApiResponse<OrderResponse[]>>(`/orders/session/${sessionId}`);
      return response.data.data!;
    },

    getById: async (id: string): Promise<OrderResponse> => {
      const response = await apiClient.get<ApiResponse<OrderResponse>>(`/orders/${id}`);
      return response.data.data!;
    },

    create: async (order: OrderRequest): Promise<OrderResponse> => {
      const response = await apiClient.post<ApiResponse<OrderResponse>>('/orders', order);
      return response.data.data!;
    },

    updateStatus: async (id: string, status: string): Promise<OrderResponse> => {
      const response = await apiClient.patch<ApiResponse<OrderResponse>>(`/orders/${id}/status`, { status });
      return response.data.data!;
    },

    cancel: async (id: string): Promise<OrderResponse> => {
      const response = await apiClient.patch<ApiResponse<OrderResponse>>(`/orders/${id}/cancel`);
      return response.data.data!;
    },

    // Kitchen specific methods
    getKitchenQueue: async (): Promise<OrderResponse[]> => {
      const response = await apiClient.get<ApiResponse<OrderResponse[]>>('/orders/kitchen/queue');
      return response.data.data!;
    },

    markReady: async (id: string): Promise<OrderResponse> => {
      const response = await apiClient.patch<ApiResponse<OrderResponse>>(`/orders/${id}/ready`);
      return response.data.data!;
    }
  };

  export default orderService;