import type { IOrderRepository, OrderDetailItem } from '../../repositories/IOrderRepository';
import type { ITableRepository } from '../../repositories/ITableRepository';
import type { Order } from '../../entities/Order';

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private tableRepository: ITableRepository
  ) {}

  async execute(tableId: string, items: OrderDetailItem[]): Promise<Order> {
   
    if (items.length === 0) {
      throw new Error('La orden debe contener al menos un producto');
    }

    //await this.tableRepository.getById(tableId);
    
    for (const item of items) {
      if (item.quantity <= 0) {
        throw new Error('Las cantidades deben ser mayores a 0');
      }
    }

    return await this.orderRepository.create({ tableId, items });
  }
}