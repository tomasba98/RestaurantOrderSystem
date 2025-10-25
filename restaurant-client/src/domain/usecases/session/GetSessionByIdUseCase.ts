import type { ISessionRepository } from '../../repositories/ISessionRepository';
import type { TableSession } from '../../entities/Session';

export class GetSessionByIdUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(id: string): Promise<TableSession> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la sesión es requerido');
    }
    return await this.sessionRepository.getById(id);
  }
}