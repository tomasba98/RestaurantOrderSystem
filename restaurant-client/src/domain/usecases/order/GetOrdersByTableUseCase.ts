import type { IOrderRepository } from '../../repositories/IOrderRepository';
import type { Order } from '../../entities/Order';

export class GetOrdersByTableUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(tableId: string): Promise<Order[]> {
    return await this.orderRepository.getByTable(tableId);
  }
}