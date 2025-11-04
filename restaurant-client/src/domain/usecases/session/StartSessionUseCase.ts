import type { ISessionRepository } from '../../repositories/ISessionRepository';
import type { CreateSessionData } from '../../repositories/ISessionRepository';
import type { TableSession } from '../../entities/Session';

export class StartSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(data: CreateSessionData): Promise<TableSession> {
    if (!data.tableId || data.tableId.trim() === '') {
      throw new Error('El ID de la mesa es requerido');
    }

    const activeSessions = await this.sessionRepository.getActiveByTable(data.tableId);
    if (activeSessions) {
      throw new Error('Ya existe una sesión activa para esta mesa');
    }

    return await this.sessionRepository.start(data);
  }
}