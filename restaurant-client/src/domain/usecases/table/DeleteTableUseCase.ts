import type { ITableRepository } from '../../repositories/ITableRepository';

export class DeleteTableUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(tableId: string): Promise<void> {
    const table = await this.tableRepository.getById(tableId);
    
    if (table.isOccupied) {
      throw new Error('No se puede eliminar una mesa ocupada');
    }

    await this.tableRepository.delete(tableId);
  }
}