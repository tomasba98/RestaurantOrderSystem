import type { IOrderRepository } from '../../repositories/IOrderRepository';
import type { Order } from '../../entities/Order';
import type { PaginatedResponse, PaginationParams } from '@/utils/Pagination';

export class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(params?: PaginationParams): Promise<PaginatedResponse<Order>> {
    // Parámetros por defecto si no se proporcionan
    const defaultParams: PaginationParams = {
      pageNumber: params?.pageNumber ?? 1,
      pageSize: params?.pageSize ?? 10,
      sortBy: params?.sortBy ?? 'createdAt',
      sortDirection: params?.sortDirection ?? 'desc',
    };

    // Validar parámetros de paginación
    if (defaultParams.pageNumber! < 1) {
      throw new Error('El número de página debe ser mayor o igual a 1');
    }

    if (defaultParams.pageSize! < 1 || defaultParams.pageSize! > 100) {
      throw new Error('El tamaño de página debe estar entre 1 y 100');
    }

    return await this.orderRepository.getAll(defaultParams);
  }
}