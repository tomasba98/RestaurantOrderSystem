import { Roles } from '../../domain/entities/User';

export interface LoginDTO {
  userName: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  role?: Roles;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  role: Roles;
}

export interface AuthStateDTO {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}