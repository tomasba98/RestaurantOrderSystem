import type { ISessionRepository } from '../../repositories/ISessionRepository';

export class EndSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la sesión es requerido');
    }
    const session = await this.sessionRepository.getById(id);
    
    if (!session) {
      throw new Error(`Sesión no encontrada con ID: ${id}`);
    }

    if (!session.isActive) {
      throw new Error('La sesión ya ha sido finalizada');
    }

    await this.sessionRepository.end(id);
  }
}