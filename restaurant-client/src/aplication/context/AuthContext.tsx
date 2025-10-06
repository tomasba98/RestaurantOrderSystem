/*
import React, { createContext, useState } from 'react';
import { ApiUtils, authService } from '@/services/api';
import { type User, type AccessRequest, type AuthenticationResponse, Roles, type AuthContextType } from '@/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = async (credentials: AccessRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AuthenticationResponse = await authService.login(credentials);
      const userProfile = await authService.getProfile();

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(userProfile));

      setToken(response.token);
      setUser(userProfile);

    } catch (error: any) {
      setError(ApiUtils.handleApiError(error));
      logout(); 
      throw error;

    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (e) {
      console.error('Error during logout', e);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      setToken(null);
      setUser(null);
    }
  };

  const clearError = () => setError(null);
  const updateUserProfile = (newUser: User) => {
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const hasRole = (role: Roles): boolean => user?.role === role;
  const hasAnyRole = (roles: Roles[]): boolean => user ? roles.includes(user.role) : false;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    updateUserProfile,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
*/
// src/application/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';
import { type User, Roles } from '../../domain/entities/User';
import type { LoginDTO } from '../dto/AuthDTO';
import type { RegisterData } from '@/domain/repositories/IAuthRepository';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Inicializar repositorio y casos de uso
const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay una sesión activa al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const currentUser = await authRepository.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginDTO) => {
    try {
      setIsLoading(true);
      setError(null);
      const authResponse = await loginUseCase.execute(credentials);
      const userProfile = await authRepository.getProfile();
      setUser(userProfile);

      localStorage.setItem('auth_token', authResponse.token);
      localStorage.setItem('auth_user', JSON.stringify(userProfile));

    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      logoutUseCase.execute();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const authResponse = await registerUseCase.execute(data);
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUseCase.execute();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export { Roles };