import type { TableResponse, TableRequest } from '@/types';
import apiClient from '../axiosConfig';

const tableService = {
    getAll: async (): Promise<TableResponse[]> => {
      const response = await apiClient.get<TableResponse[]>('/Table');
      return response.data;
    },

    getAvailable: async (): Promise<TableResponse[]> => {
      const response = await apiClient.get<TableResponse[]>('/Table/available');
      return response.data;
    },

    getById: async (id: string): Promise<TableResponse> => {
      const response = await apiClient.get<TableResponse>(`/Table/${id}`);
      return response.data;
    },

    create: async (table: TableRequest): Promise<TableResponse> => {
      const response = await apiClient.post<TableResponse>('/Table', table);
      return response.data;
    },

    update: async (id: string, table: Partial<TableRequest>): Promise<TableResponse> => {
      const response = await apiClient.put<TableResponse>(`/Table/${id}`, table);
      return response.data;
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/Table/${id}`);
    },

    setOccupation: async (id: string, isOccupied: boolean): Promise<boolean> => {
      const response = await apiClient.patch<{ isOccupied: boolean }>(`/Table/${id}/set-occupation`, isOccupied );
      return response.data.isOccupied;
    }
  };

  export default tableService;