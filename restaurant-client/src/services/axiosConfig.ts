import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiClient: AxiosInstance = axios.create(axiosConfig);


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }    
    if (import.meta.env.DEV) {
      console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          localStorage.removeItem('auth_token');
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
        default:
          console.error(`❌ Error ${status}:`, data?.message || 'Unkonwn error');
      }
    } else if (error.request) {
      console.error('❌ No response was received from the server.:', error.request);
    } else {
      console.error('❌ Error in request configuration:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;