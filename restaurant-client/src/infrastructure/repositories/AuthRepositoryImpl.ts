import type { User } from '@/domain/entities/User';
import type {   IAuthRepository,   LoginCredentials,   RegisterData,   AuthResponse } from '@/domain/repositories/IAuthRepository';
import { apiClient } from '../http/apiClientInstance';

export class AuthRepositoryImpl implements IAuthRepository {
  private readonly basePath = '/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(`${this.basePath}/login`, credentials);
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return await apiClient.post<AuthResponse>(`${this.basePath}/register`, data);
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  }

  async getProfile(): Promise<User> {
    return await apiClient.get<User>(`${this.basePath}/profile`);
  }

  async verifyToken(): Promise<boolean> {
    try {
      await apiClient.post(`${this.basePath}/verify`);
      return true;
    } catch {
      return false;
    }
  }
}