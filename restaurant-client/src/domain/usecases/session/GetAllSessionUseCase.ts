import type { ISessionRepository } from '../../repositories/ISessionRepository';
import type { TableSession } from '../../entities/Session';

export class GetAllSessionsUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(): Promise<TableSession[]> {
    return await this.sessionRepository.getAll();
  }
}
