import type { Table } from '@/domain/entities/Table';
import type { ITableRepository, CreateTableData, UpdateTableData } from '@/domain/repositories/ITableRepository';
import { apiClient } from '../http/apiClientInstance';

export class TableRepositoryImpl implements ITableRepository {
  private readonly basePath = '/Table';

  async getAll(): Promise<Table[]> {
    return await apiClient.get<Table[]>(this.basePath);
  }

  async getById(id: string): Promise<Table> {
    return await apiClient.get<Table>(`${this.basePath}/${id}`);
  }

  async getAvailable(): Promise<Table[]> {
    return await apiClient.get<Table[]>(`${this.basePath}/available`);
  }

  async create(data: CreateTableData): Promise<Table> {
    return await apiClient.post<Table>(this.basePath, data);
  }

  async update(id: string, data: UpdateTableData): Promise<Table> {
    return await apiClient.put<Table>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async setOccupation(id: string, isOccupied: boolean): Promise<boolean> {
    const response = await apiClient.patch<{ isOccupied: boolean }>(
      `${this.basePath}/${id}/set-occupation`,
      isOccupied
    );
    return response.isOccupied;
  }
}
