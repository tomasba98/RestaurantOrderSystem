import React, { createContext, useEffect, useReducer } from 'react';
import  { ApiUtils, authService } from '@/services/api';
import { type User, type AccessRequest, type AuthenticationResponse, Roles, type AuthState, type AuthContextType, type AuthAction } from '@/types';

const token = localStorage.getItem('auth_token');

const initialState: AuthState = {
  user: null,
  token: token,
  isLoading: false,
  isAuthenticated: !!token,
  error: null,
};
interface AuthProviderProps {
  children: React.ReactNode;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  
  const login = async (credentials: AccessRequest): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response: AuthenticationResponse = await authService.login(credentials);
            
      localStorage.setItem('auth_token', response.token);
            
      const userProfile = await authService.getProfile();
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: userProfile,
          token: response.token,
        },
      });
    } catch (error: any) {
      const errorMessage = ApiUtils.handleApiError(error);
      
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });
            
      localStorage.removeItem('auth_token');
      throw error;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
    }
  }; 

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateUserProfile = (user: User): void => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const hasRole = (role: Roles): boolean => {
    return state.user?.role === role;
  };

  const hasAnyRole = (roles: Roles[]): boolean => {
    return state.user ? roles.includes(state.user.role) : false;
  };

  const checkAuth = async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      dispatch({ type: 'LOGOUT' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const isValid = await authService.verifyToken();
      
      if (isValid) {        
        const userProfile = await authService.getProfile();
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: userProfile,
            token,
          },
        });
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('auth_token');
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    checkAuth,
    updateUserProfile,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
