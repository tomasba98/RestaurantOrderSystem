// src/services/axiosConfig.ts
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create(axiosConfig);

// Interceptor para requests - Agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage o context
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log de requests en desarrollo
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

// Interceptor para responses - Manejo de errores globales
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log de responses exitosas en desarrollo
    if (import.meta.env.DEV) {
      console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Manejo de errores globales
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Token expirado o no válido
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('❌ Acceso denegado');
          break;
        case 404:
          console.error('❌ Recurso no encontrado');
          break;
        case 500:
          console.error('❌ Error interno del servidor');
          break;
        default:
          console.error(`❌ Error ${status}:`, data?.message || 'Error desconocido');
      }
    } else if (error.request) {
      console.error('❌ No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('❌ Error en la configuración de la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;