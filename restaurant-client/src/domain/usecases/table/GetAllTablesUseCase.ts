import type { ITableRepository } from '../../repositories/ITableRepository';
import type { Table } from '../../entities/Table';

export class GetAllTablesUseCase {
  constructor(private tableRepository: ITableRepository) {}

  async execute(): Promise<Table[]> {
    return await this.tableRepository.getAll();
  }
}