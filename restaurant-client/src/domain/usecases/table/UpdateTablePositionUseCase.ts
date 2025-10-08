import type { ITableRepository } from '../../repositories/ITableRepository';
import type { Table } from '../../entities/Table';

export class UpdateTablePositionUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(tableId: string, x: number, y: number): Promise<Table> {
    if (x < 0 || y < 0) {
      throw new Error('Las coordenadas no pueden ser negativas');
    }

    return await this.tableRepository.update(tableId, x, y );
  }
}