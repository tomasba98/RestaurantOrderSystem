import type { TableSession } from "@/domain/entities/Session";
import type { CreateSessionData, ISessionRepository } from "@/domain/repositories/ISessionRepository";
import { apiClient } from "../http/apiClientInstance";

export class SessionRepositoryImpl implements ISessionRepository {
    private readonly basePath = '/Session';
  
    async getAll(): Promise<TableSession[]> {
      return await apiClient.get<TableSession[]>(this.basePath);
    }
  
    async getById(id: string): Promise<TableSession> {
      return await apiClient.get<TableSession>(`${this.basePath}/${id}`);
    }
  
    async getActiveByTable(id: string): Promise<TableSession[]> {
      return await apiClient.get<TableSession[]>(`${this.basePath}/${id}`);
    }
  
    async start(data: CreateSessionData): Promise<TableSession> {
      return await apiClient.post<TableSession>(this.basePath, data);
    }  
  
    async end(id: string): Promise<void> {
      await apiClient.delete(`${this.basePath}/${id}`);
    }
}