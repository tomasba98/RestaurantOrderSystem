import React, { createContext, useState, useEffect, type ReactNode } from 'react';
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
  hasRole: (roles: Roles) => boolean;
  hasAnyRole: (roles: Roles[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const currentUser = await authRepository.getProfile();
          setUser(currentUser);
        } catch (error) {
          localStorage.removeItem('auth_token');
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
      await loginUseCase.execute(credentials);
      
      const userProfile = await authRepository.getProfile();      
      localStorage.setItem('auth_user', JSON.stringify(userProfile));
      setUser(userProfile);

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
      await registerUseCase.execute(data);
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

  const hasRole = (role: Roles): boolean => user?.role === role;
  const hasAnyRole = (roles: Roles[]): boolean => user ? roles.includes(user.role) : false;

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
        hasRole,
        hasAnyRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};