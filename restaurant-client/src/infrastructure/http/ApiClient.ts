import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
  
        if (import.meta.env.DEV) {
          const method = config.method?.toUpperCase() ?? 'UNKNOWN';
          const url = config.url;
          
          if (url?.includes('/login') || url?.includes('/register')) {
            console.log(`🚀 [${method}] ${url} [CREDENTIALS HIDDEN]`);
          } else {
            const logData = config.data ? config.data : undefined;
            console.log(`🚀 [${method}] ${url}`, logData);
          }
        }
  
        return config;
      },
      (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
      }
    );
  
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (import.meta.env.DEV) {
          const method = response.config.method?.toUpperCase() ?? 'UNKNOWN';
          console.log(
            `✅ [${response.status}] [${method}] ${response.config.url}`, response.data );
        }
        return response;
      },
      (error) => {
        if (error.response) {
          const { status } = error.response;
  
          switch (status) {
            case 401:
              sessionStorage.removeItem('auth_token');
              window.location.href = '/login';
              break;
            case 403:
              console.error('❌ Access denied');
              break;
            case 404:
              console.error('❌ Resource not found');
              break;
            case 500:
              console.error('❌ Internal Server Error');
              break;
          }
        } else {
          console.error('❌ Network or unknown error:', error);
        }
  
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');