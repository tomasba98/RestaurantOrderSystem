import type { EntityBase, Roles } from './index';

export interface User extends EntityBase {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    lastLogin?: string;
    role: Roles;
  }  
  
 export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
  export interface AuthContextType extends AuthState {
    login: (credentials: AccessRequest) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    checkAuth: () => Promise<void>;
    updateUserProfile: (user: User) => void;
    hasRole: (role: Roles) => boolean;
    hasAnyRole: (roles: Roles[]) => boolean;
  }
export interface AccessRequest {
  userName: string;
  password: string;
}

export interface AuthenticationResponse {
  userName: string;
  token: string;
}

export interface RegisterUserRequest {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Roles;
  isActive: boolean;
}

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'lastLogin'>;
export type UpdateUser = Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'role' | 'isActive'>>;
export type AuthAction =
| { type: 'LOGIN_START' }
| { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
| { type: 'LOGIN_FAILURE'; payload: string }
| { type: 'LOGOUT' }
| { type: 'CLEAR_ERROR' }
| { type: 'SET_LOADING'; payload: boolean }
| { type: 'UPDATE_USER'; payload: User };
