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
    const orders = await this.orderRepository.getKitchenQueue();
    
    const kitchenStatuses = [OrderStatus.Confirmed, OrderStatus.InKitchen];
    
    const filteredOrders = orders.filter(order => 
      kitchenStatuses.includes(order.status)
    );

    const sortedOrders = filteredOrders.sort((a, b) => {
      if (a.status === OrderStatus.Confirmed && b.status === OrderStatus.InKitchen) {
        return -1;
      }
      if (a.status === OrderStatus.InKitchen && b.status === OrderStatus.Confirmed) {
        return 1; 
      }      
      
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    return sortedOrders;
  }

  /**
   * Get only confirmed orders (waiting to start)
   */
  async getPendingOrders(): Promise<Order[]> {
    const allOrders = await this.execute();
    return allOrders.filter(order => order.status === OrderStatus.Confirmed);
  }

  /**
   * Get only in-progress orders (currently being prepared)
   */
  async getInProgressOrders(): Promise<Order[]> {
    const allOrders = await this.execute();
    return allOrders.filter(order => order.status === OrderStatus.InKitchen);
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
    const allOrders = await this.execute();
    const pending = allOrders.filter(o => o.status === OrderStatus.Confirmed);
    const inProgress = allOrders.filter(o => o.status === OrderStatus.InKitchen);
    
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
      total: allOrders.length,
      pending: pending.length,
      inProgress: inProgress.length,
      avgWaitTime,
    };
  }
}
