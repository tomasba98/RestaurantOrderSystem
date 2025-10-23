import type { IOrderRepository } from '../../repositories/IOrderRepository';
import { OrderStatus, type Order } from '../../entities/Order';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);    
    
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.Confirmed]: [OrderStatus.InKitchen, OrderStatus.Canceled],
      [OrderStatus.InKitchen]: [OrderStatus.Ready, OrderStatus.Canceled],
      [OrderStatus.Ready]: [OrderStatus.Served],
      [OrderStatus.Served]: [OrderStatus.Paid],
      [OrderStatus.Paid]: [],
      [OrderStatus.Canceled]: []
    };

    if (!validTransitions[order.status].includes(status)) {
      throw new Error(`No se puede cambiar el estado de ${order.status} a ${status}`);
    }

    return await this.orderRepository.updateStatus(orderId, status);
  }
}