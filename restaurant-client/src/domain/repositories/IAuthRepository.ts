import type { RegisterDTO } from '@/aplication/dto/UserDTO';
import type { User } from '../entities/User';

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface AuthResponse {
  userName: string;
  token: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterDTO): Promise<AuthResponse>;
  logout(): Promise<void>;
  getProfile(): Promise<User>;
  verifyToken(token: string): Promise<boolean>;
}