import type { CreateUserData, IUserRepository, UpdateUserData } from "@/domain/repositories/IUserRepository";
import { apiClient } from "../http/ApiClient";
import type { User } from "@/domain/entities/User";

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
          return await apiClient.get<User>(`this.basePath/${id}`);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al cargar el usuario');
        }
      }
    
      async create(data: CreateUserData): Promise<User> {
        try {
          return await apiClient.post<User>('this.basePath', data);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al crear el usuario');
        }
      }
    
      async update(id: string, data: UpdateUserData): Promise<User> {
        try {
          return await apiClient.put<User>(`this.basePath/${id}`, data);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al actualizar el usuario');
        }
      }
    
      async delete(id: string): Promise<void> {
        try {
          await apiClient.delete(`this.basePath/${id}`);
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Error al eliminar el usuario');
        }
      }
}