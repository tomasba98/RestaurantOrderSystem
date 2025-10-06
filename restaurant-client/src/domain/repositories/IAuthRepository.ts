import type { User } from '../entities/User';

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  role: number;
  email: string;
  password: string;
}

export interface AuthResponse {
  userName: string;
  token: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
  getProfile(): Promise<User>;
  verifyToken(): Promise<boolean>;
}