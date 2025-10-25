import type { TableSession } from '../entities/Session';

export interface CreateSessionData {
  tableId: string;
}

export interface ISessionRepository {
  getById(id: string): Promise<TableSession>;
  getAll(): Promise<TableSession[]>;
  start(data: CreateSessionData): Promise<TableSession>;
  end(id: string): Promise<void>;
  getActiveByTable(tableId: string): Promise<TableSession>;
}