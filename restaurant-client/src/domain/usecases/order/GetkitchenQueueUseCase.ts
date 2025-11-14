import type { IOrderRepository } from '../../repositories/IOrderRepository';
import type { Order } from '../../entities/Order';
import { OrderStatus } from '../../entities/Order';

export class GetKitchenQueueUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  /**
   * Retrieves all orders in the kitchen queue, sorted by priority.
   * The priority is as follows:
   * 1. Confirmed orders (waiting to start) come first.
   * 2. Orders already in the kitchen come next.
   * 3. Within each group, orders are sorted by creation time (oldest first).
   * @returns A promise that resolves with an array of orders in the kitchen queue, sorted by priority.
   */
  async execute(): Promise<Order[]> {
    // Obtener ambos tipos de órdenes en paralelo
    const [confirmedOrders, inKitchenOrders] = await Promise.all([
      this.orderRepository.getByStatus(OrderStatus.Confirmed),
      this.orderRepository.getByStatus(OrderStatus.InKitchen),
    ]);

    // Ordenar cada grupo por fecha de creación (más antiguas primero)
    const sortByCreationDate = (a: Order, b: Order) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    };

    const sortedConfirmed = confirmedOrders.sort(sortByCreationDate);
    const sortedInKitchen = inKitchenOrders.sort(sortByCreationDate);

    // Prioridad: Confirmed primero, luego InKitchen
    return [...sortedConfirmed, ...sortedInKitchen];
  }

  /**
   * Get only confirmed orders (waiting to start)
   */
  async getPendingOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getByStatus(OrderStatus.Confirmed);
    return orders.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });
  }

  /**
   * Get only in-progress orders (currently being prepared)
   */
  async getInProgressOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getByStatus(OrderStatus.InKitchen);
    return orders.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });
  }

  /**
   * Get kitchen queue statistics
   */
  async getQueueStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    avgWaitTime: number;
  }> {
    const [pending, inProgress] = await Promise.all([
      this.orderRepository.getByStatus(OrderStatus.Confirmed),
      this.orderRepository.getByStatus(OrderStatus.InKitchen),
    ]);

    let avgWaitTime = 0;
    if (pending.length > 0) {
      const now = new Date().getTime();
      const totalWaitTime = pending.reduce((sum, order) => {
        const createdAt = new Date(order.createdAt).getTime();
        return sum + (now - createdAt);
      }, 0);
      avgWaitTime = Math.floor(totalWaitTime / pending.length / 60000);
    }

    return {
      total: pending.length + inProgress.length,
      pending: pending.length,
      inProgress: inProgress.length,
      avgWaitTime,
    };
  }
}