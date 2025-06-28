import type { EntityBase, Roles } from './index';

export interface User extends EntityBase {
    userName: string;
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

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  role: Roles
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  role: Roles
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Roles;
  isActive: boolean;
}

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'lastLogin'>;
export type UpdateUser = Partial<Pick<User, 'userName' | 'role' >>;