import type { IOrderRepository } from '../../repositories/IOrderRepository';
import type { Order } from '../../entities/Order';
import { OrderStatus } from '../../entities/Order';

export class GetKitchenQueueUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    // Obtener todas las órdenes de la cola de cocina
    const orders = await this.orderRepository.getKitchenQueue();
    
    // Filtrar solo órdenes relevantes para cocina
    // Confirmadas: Esperando a ser procesadas
    // InKitchen: Actualmente siendo preparadas
    const kitchenStatuses = [OrderStatus.Confirmed, OrderStatus.InKitchen];
    
    const filteredOrders = orders.filter(order => 
      kitchenStatuses.includes(order.status)
    );

    // Ordenar las órdenes por prioridad:
    // 1. Primero las confirmadas (pendientes de comenzar)
    // 2. Luego las que están en cocina
    // 3. Dentro de cada grupo, por tiempo (más antiguas primero)
    const sortedOrders = filteredOrders.sort((a, b) => {
      // Prioridad por estado
      if (a.status === OrderStatus.Confirmed && b.status === OrderStatus.InKitchen) {
        return -1; // a va primero
      }
      if (a.status === OrderStatus.InKitchen && b.status === OrderStatus.Confirmed) {
        return 1; // b va primero
      }
      
      // Si tienen el mismo estado, ordenar por fecha (más antigua primero)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    return sortedOrders;
  }

  /**
   * Obtener solo las órdenes confirmadas (pendientes de comenzar)
   */
  async getPendingOrders(): Promise<Order[]> {
    const allOrders = await this.execute();
    return allOrders.filter(order => order.status === OrderStatus.Confirmed);
  }

  /**
   * Obtener solo las órdenes en cocina (en preparación)
   */
  async getInProgressOrders(): Promise<Order[]> {
    const allOrders = await this.execute();
    return allOrders.filter(order => order.status === OrderStatus.InKitchen);
  }

  /**
   * Obtener estadísticas de la cola de cocina
   */
  async getQueueStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    avgWaitTime: number; // en minutos
  }> {
    const allOrders = await this.execute();
    const pending = allOrders.filter(o => o.status === OrderStatus.Confirmed);
    const inProgress = allOrders.filter(o => o.status === OrderStatus.InKitchen);

    // Calcular tiempo promedio de espera para órdenes pendientes
    let avgWaitTime = 0;
    if (pending.length > 0) {
      const now = new Date().getTime();
      const totalWaitTime = pending.reduce((sum, order) => {
        const createdAt = new Date(order.createdAt).getTime();
        return sum + (now - createdAt);
      }, 0);
      avgWaitTime = Math.floor(totalWaitTime / pending.length / 60000); // convertir a minutos
    }

    return {
      total: allOrders.length,
      pending: pending.length,
      inProgress: inProgress.length,
      avgWaitTime,
    };
  }
}