import type { ITableRepository } from '../../repositories/ITableRepository';

export class ToggleTableOccupationUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(tableId: string, isOccupied: boolean): Promise<boolean> {
    return await this.tableRepository.setOccupation(tableId, isOccupied);
  }
}