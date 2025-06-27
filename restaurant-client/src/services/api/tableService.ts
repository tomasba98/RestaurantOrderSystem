import type { TableResponse, TableRequest, ApiResponse } from '@/types';
import apiClient from '../axiosConfig';

const tableService = {
    getAll: async (): Promise<TableResponse[]> => {
      const response = await apiClient.get<ApiResponse<TableResponse[]>>('/tables');
      return response.data.data!;
    },

    getAvailable: async (): Promise<TableResponse[]> => {
      const response = await apiClient.get<ApiResponse<TableResponse[]>>('/tables/available');
      return response.data.data!;
    },

    getById: async (id: string): Promise<TableResponse> => {
      const response = await apiClient.get<ApiResponse<TableResponse>>(`/tables/${id}`);
      return response.data.data!;
    },

    create: async (table: TableRequest): Promise<TableResponse> => {
      const response = await apiClient.post<ApiResponse<TableResponse>>('/tables', table);
      return response.data.data!;
    },

    update: async (id: string, table: Partial<TableRequest>): Promise<TableResponse> => {
      const response = await apiClient.put<ApiResponse<TableResponse>>(`/tables/${id}`, table);
      return response.data.data!;
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/tables/${id}`);
    },

    occupy: async (id: string): Promise<TableResponse> => {
      const response = await apiClient.patch<ApiResponse<TableResponse>>(`/tables/${id}/occupy`);
      return response.data.data!;
    },

    free: async (id: string): Promise<TableResponse> => {
      const response = await apiClient.patch<ApiResponse<TableResponse>>(`/tables/${id}/free`);
      return response.data.data!;
    }
  };

  export default tableService;