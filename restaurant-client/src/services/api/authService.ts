import apiClient from '../axiosConfig';
import type { AccessRequest, AuthenticationResponse, ApiResponse, User, RegisterRequest } from '@/types';

const authService = {
  login: async (credentials: AccessRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: RegisterRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>('/auth/register', userData);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
  verifyToken: async (): Promise<boolean> => {
    try {
      await apiClient.post('/auth/verify');
      return true;
    } catch {
      return false;
    }
  },
  refreshToken: async (): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>('/auth/refresh');
    return response.data;
  },
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data.data!;
  }
};

export default authService;
