import type { PaginationParams, ApiResponse, PaginatedResponse, User, UpdateUserRequest } from '@/types';
import apiClient from '../axiosConfig';

const userService = {
    getAll: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
      const response = await apiClient.get<PaginatedResponse<User>>('/users', { params });
      return response.data;
    },

    getById: async (id: string): Promise<User> => {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
      return response.data.data!;
    },

    update: async (id: string, userData: UpdateUserRequest): Promise<User> => {
      const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
      return response.data.data!;
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`/users/${id}`);
    },

    activate: async (id: string): Promise<User> => {
      const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/activate`);
      return response.data.data!;
    },

    deactivate: async (id: string): Promise<User> => {
      const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}/deactivate`);
      return response.data.data!;
    }
  };

  export default userService;