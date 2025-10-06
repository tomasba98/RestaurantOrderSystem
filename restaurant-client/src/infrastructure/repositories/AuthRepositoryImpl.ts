/*
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
  */

// src/infrastructure/repositories/AuthRepositoryImpl.ts

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

    // Interceptor para agregar token a las peticiones
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
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

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiClient.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      return null;
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
      const response =  await this.apiClient.get<User>('/auth//profile');
      return response.data;
    }catch(error: any){
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  }  
}