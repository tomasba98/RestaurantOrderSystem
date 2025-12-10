import { Roles } from '../../domain/entities/User';

export interface LoginDTO {
  userName: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  userName: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
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

export interface UpdateUserDTO{
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
}