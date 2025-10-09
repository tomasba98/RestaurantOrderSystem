import type { IOrderRepository } from '../../repositories/IOrderRepository';
import { OrderStatus, type Order } from '../../entities/Order';

export class MarkOrderReadyUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    // Validar que el ID no esté vacío
    if (!orderId || orderId.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    // Obtener la orden actual
    const order = await this.orderRepository.getById(orderId);
    
    // Validar que la orden existe
    if (!order) {
      throw new Error(`No se encontró la orden con ID: ${orderId}`);
    }

    // Validar que la orden está en el estado correcto
    if (order.status !== OrderStatus.InKitchen) {
      throw new Error(
        `Solo se pueden marcar como listas las órdenes que están en cocina. ` +
        `Estado actual: ${this.getStatusLabel(order.status)}`
      );
    }

    // Validar que la orden tiene productos
    if (!order.productList || order.productList.length === 0) {
      throw new Error('La orden no tiene productos');
    }

    // Marcar la orden como lista
    const updatedOrder = await this.orderRepository.markReady(orderId);

    // Verificar que el estado se actualizó correctamente
    if (updatedOrder.status !== OrderStatus.Ready) {
      throw new Error('Error al actualizar el estado de la orden');
    }

    return updatedOrder;
  }

  /**
   * Marcar múltiples órdenes como listas
   */
  async executeMultiple(orderIds: string[]): Promise<Order[]> {
    if (!orderIds || orderIds.length === 0) {
      throw new Error('Se debe proporcionar al menos un ID de orden');
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
          error: error.message || 'Error desconocido',
        });
      }
    }

    if (errors.length > 0) {
      console.warn('Algunas órdenes no pudieron ser marcadas como listas:', errors);
    }

    return results;
  }

  /**
   * Verificar si una orden puede ser marcada como lista
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
          reason: `La orden debe estar en cocina. Estado actual: ${this.getStatusLabel(order.status)}`,
        };
      }

      if (!order.productList || order.productList.length === 0) {
        return {
          canMark: false,
          reason: 'La orden no tiene productos',
        };
      }

      return { canMark: true };
    } catch (error: any) {
      return {
        canMark: false,
        reason: error.message || 'Error al verificar la orden',
      };
    }
  }

  /**
   * Obtener etiqueta legible del estado
   */
  private getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.Confirmed]: 'Confirmada',
      [OrderStatus.InKitchen]: 'En Cocina',
      [OrderStatus.Ready]: 'Lista',
      [OrderStatus.Served]: 'Servida',
      [OrderStatus.Paid]: 'Pagada',
      [OrderStatus.Canceled]: 'Cancelada',
    };
    return labels[status] || status;
  }
}