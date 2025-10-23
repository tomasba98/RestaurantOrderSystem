import type { IOrderRepository } from '../../repositories/IOrderRepository';
import { OrderStatus, type Order } from '../../entities/Order';

export class MarkOrderReadyUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    // Validate that the ID is not empty
    if (!orderId || orderId.trim() === '') {
      throw new Error('Order ID is required');
    }

    // Get the current order
    const order = await this.orderRepository.getById(orderId);
    
    // Validate that the order exists
    if (!order) {
      throw new Error(`Order not found with ID: ${orderId}`);
    }

    // Validate that the order is in the correct status
    if (order.status !== OrderStatus.InKitchen) {
      throw new Error(
        `Only orders currently in the kitchen can be marked as ready. ` +
        `Current status: ${this.getStatusLabel(order.status)}`
      );
    }

    // Validate that the order has products
    if (!order.productList || order.productList.length === 0) {
      throw new Error('The order has no products');
    }

    // Mark the order as ready
    const updatedOrder = await this.orderRepository.markReady(orderId);

    // Verify that the status was updated correctly
    if (updatedOrder.status !== OrderStatus.Ready) {
      throw new Error('Failed to update order status');
    }

    return updatedOrder;
  }

  /**
   * Mark multiple orders as ready
   */
  async executeMultiple(orderIds: string[]): Promise<Order[]> {
    if (!orderIds || orderIds.length === 0) {
      throw new Error('At least one order ID must be provided');
    }

    const results: Order[] = [];
    const errors: { orderId: string; error: string }[] = [];

    for (const orderId of orderIds) {
      try {
        const updatedOrder = await this.execute(orderId);
        results.push(updatedOrder);
      } catch (error: any) {
        errors.push({
          orderId,
          error: error.message || 'Unknown error',
        });
      }
    }

    if (errors.length > 0) {
      console.warn('Some orders could not be marked as ready:', errors);
    }

    return results;
  }

  /**
   * Check if an order can be marked as ready
   */
  async canMarkAsReady(orderId: string): Promise<{
    canMark: boolean;
    reason?: string;
  }> {
    try {
      const order = await this.orderRepository.getById(orderId);
      
      if (order.status !== OrderStatus.InKitchen) {
        return {
          canMark: false,
          reason: `The order must be in the kitchen. Current status: ${this.getStatusLabel(order.status)}`,
        };
      }

      if (!order.productList || order.productList.length === 0) {
        return {
          canMark: false,
          reason: 'The order has no products',
        };
      }

      return { canMark: true };
    } catch (error: any) {
      return {
        canMark: false,
        reason: error.message || 'Error verifying the order',
      };
    }
  }

  /**
   * Get a readable label for the order status
   */
  private getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.Confirmed]: 'Confirmed',
      [OrderStatus.InKitchen]: 'In Kitchen',
      [OrderStatus.Ready]: 'Ready',
      [OrderStatus.Served]: 'Served',
      [OrderStatus.Paid]: 'Paid',
      [OrderStatus.Canceled]: 'Canceled',
    };
    return labels[status] || status;
  }
}
