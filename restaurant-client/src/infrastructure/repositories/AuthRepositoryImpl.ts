import type { User } from '@/domain/entities/User';
import type {  AuthResponse,  IAuthRepository,  LoginCredentials,  RegisterData} from '@/domain/repositories/IAuthRepository';
import { apiClient } from '../http/ApiClient';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>('/auth/login', credentials);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>('/auth/register', data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('auth_token');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al cerrar sesión');
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al refrescar token');
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{ valid: boolean }>('/auth/validate', { token });
      return response.valid;
    } catch {
      return false;
    }
  }

  async getProfile(): Promise<User> {
    try {
      return await apiClient.get<User>('/auth/profile');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  }
}
