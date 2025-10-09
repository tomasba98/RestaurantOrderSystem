import type { IOrderRepository } from '../../repositories/IOrderRepository';
import { OrderStatus, type Order } from '../../entities/Order';

export class CancelOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
       
    const cancellableStatuses = [
      OrderStatus.Confirmed,
      OrderStatus.InKitchen,
      OrderStatus.Ready
    ];

    if (!cancellableStatuses.includes(order.status)) {
      throw new Error(
        `No se puede cancelar una orden con estado ${order.status}`
      );
    }

    if (order.status === OrderStatus.Canceled) {
      throw new Error('La orden ya está cancelada');
    }

    return await this.orderRepository.cancel(orderId);
  }
}