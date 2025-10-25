import type { ISessionRepository } from '../../repositories/ISessionRepository';
import type { TableSession } from '../../entities/Session';

export class GetActiveSessionByTableUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(tableId: string): Promise<TableSession> {
    if (!tableId || tableId.trim() === '') {
      throw new Error('El ID de la mesa es requerido');
    }

    return await this.sessionRepository.getActiveByTable(tableId);    
  }
}