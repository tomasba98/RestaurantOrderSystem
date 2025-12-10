import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import { apiClient } from "../http/ApiClient";
import type { User } from "@/domain/entities/User";
import type { RegisterDTO, UpdateUserDTO } from "@/aplication/dto/UserDTO";

export class UserRepositoryImpl implements IUserRepository{
  private readonly basePath = '/User';
    async getAll(): Promise<User[]> {
        try{
            return await apiClient.get<User[]>(this.basePath);
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Error al obtener los usuarios');
        }
    }
    async getById(id: string): Promise<User> {
        try {
          return await apiClient.get<User>(`${this.basePath}/${id}`);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al cargar el usuario');
        }
      }
    
      async create(data: RegisterDTO): Promise<User> {
        try {
          return await apiClient.post<User>('/auth/register', data);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al crear el usuario');
        }
      }
    
      async update(id: string, data: UpdateUserDTO): Promise<User> {
        try {
          return await apiClient.put<User>(`${this.basePath}/${id}`, data);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al actualizar el usuario');
        }
      }
    
      async delete(id: string): Promise<void> {
        try {
          await apiClient.delete(`${this.basePath}/${id}`);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al eliminar el usuario');
        }
      }
}