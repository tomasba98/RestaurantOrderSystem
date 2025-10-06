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
