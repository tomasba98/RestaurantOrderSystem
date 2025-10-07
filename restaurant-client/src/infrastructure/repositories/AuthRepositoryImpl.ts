import type { User } from '@/domain/entities/User';
import type { AuthResponse, IAuthRepository, LoginCredentials, RegisterData } from '@/domain/repositories/IAuthRepository';
import axios, { type AxiosInstance } from 'axios';

export class AuthRepositoryImpl implements IAuthRepository {
  private apiClient: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al cerrar sesión');
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al refrescar token');
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post('/auth/validate', { token });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  }

  async getProfile(): Promise<User> {
    try{
      const response =  await this.apiClient.get<User>('/auth/profile');
      return response.data;
    }catch(error: any){
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  }  
}