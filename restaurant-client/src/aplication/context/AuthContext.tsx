import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';
import { type User, Roles } from '../../domain/entities/User';
import type { LoginDTO, RegisterDTO } from '../dto/UserDTO';
import type { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { containerDI } from '../di/ContainerDI';


const isProduction = import.meta.env.PROD;
const isSecureContext = window.isSecureContext;

if (isProduction && !isSecureContext) {
  throw new Error('La aplicación debe ejecutarse sobre HTTPS en producción');
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  hasRole: (roles: Roles) => boolean;
  hasAnyRole: (roles: Roles[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Repositories
const authRepository = containerDI.resolve<IAuthRepository>("authRepository");

//UseCases
const loginUseCase = containerDI.resolve<LoginUseCase>("loginUseCase");
const registerUseCase = containerDI.resolve<RegisterUseCase>("registerUseCase");
const logoutUseCase = containerDI.resolve<LogoutUseCase>("logoutUseCase");

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        try {
          const currentUser = await authRepository.getProfile();
          setUser(currentUser);
        } catch (error) {
          sessionStorage.removeItem('auth_token');
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
      setUser(userProfile);

    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      await logoutUseCase.execute();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDTO) => {
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