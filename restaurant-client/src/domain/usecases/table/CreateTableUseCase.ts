import type { ITableRepository, CreateTableData } from '../../repositories/ITableRepository';
import type { Table } from '../../entities/Table';

export class CreateTableUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(data: CreateTableData): Promise<Table> {
    if (data.number <= 0) {
      throw new Error('El número de mesa debe ser mayor a 0');
    }

    if (data.x < 0 || data.y < 0) {
      throw new Error('Las coordenadas no pueden ser negativas');
    }

    return await this.tableRepository.create(data);
  }
}