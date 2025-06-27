import type { SessionResponse, SessionRequest, ApiResponse } from '@/types';
import apiClient from '../axiosConfig';

const sessionService = {
    getActive: async (): Promise<SessionResponse[]> => {
      const response = await apiClient.get<ApiResponse<SessionResponse[]>>('/sessions/active');
      return response.data.data!;
    },

    getByTable: async (tableId: string): Promise<SessionResponse[]> => {
      const response = await apiClient.get<ApiResponse<SessionResponse[]>>(`/sessions/table/${tableId}`);
      return response.data.data!;
    },

    getById: async (id: string): Promise<SessionResponse> => {
      const response = await apiClient.get<ApiResponse<SessionResponse>>(`/sessions/${id}`);
      return response.data.data!;
    },

    start: async (sessionData: SessionRequest): Promise<SessionResponse> => {
      const response = await apiClient.post<ApiResponse<SessionResponse>>('/sessions', sessionData);
      return response.data.data!;
    },

    end: async (id: string): Promise<SessionResponse> => {
      const response = await apiClient.patch<ApiResponse<SessionResponse>>(`/sessions/${id}/end`);
      return response.data.data!;
    },

    getCurrentSession: async (tableId: string): Promise<SessionResponse | null> => {
      try {
        const response = await apiClient.get<ApiResponse<SessionResponse>>(`/sessions/table/${tableId}/current`);
        return response.data.data!;
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    }
  };

  export default sessionService;