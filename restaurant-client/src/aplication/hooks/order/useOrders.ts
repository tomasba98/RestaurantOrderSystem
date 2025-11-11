import { useState, useCallback } from 'react';
import type { Order } from '@/domain/entities/Order';
import { OrderStatus } from '@/domain/entities/Order';
import type { IOrderRepository, OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import { CreateOrderUseCase } from '@/domain/usecases/order/CreateOrderUseCase';
import { GetOrdersByTableUseCase } from '@/domain/usecases/order/GetOrdersByTableUseCase';
import { UpdateOrderStatusUseCase } from '@/domain/usecases/order/UpdateOrderStatusUseCase';
import { CancelOrderUseCase } from '@/domain/usecases/order/CancelOrderUseCase';
import { GetKitchenQueueUseCase } from '@/domain/usecases/order/GetkitchenQueueUseCase';
import { MarkOrderReadyUseCase } from '@/domain/usecases/order/MarkOrderReadyUseCase';
import { StartSessionUseCase } from '@/domain/usecases/session/StartSessionUseCase';
import { GetActiveSessionByTableUseCase } from '@/domain/usecases/session/GetActiveSessionByTableUseCase';
import { EndSessionUseCase } from '@/domain/usecases/session/EndSessionUseCase';
import { containerDI } from '@/aplication/di/ContainerDI';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  //Repositories
  const orderRepository = containerDI.resolve<IOrderRepository>("orderRepository");

  //UseCases
  const createOrderUseCase = containerDI.resolve<CreateOrderUseCase>("createOrderUseCase");
  const getOrdersByTableUseCase = containerDI.resolve<GetOrdersByTableUseCase>("getOrdersByTableUseCase");
  const updateOrderStatusUseCase = containerDI.resolve<UpdateOrderStatusUseCase>("updateOrderStatusUseCase");
  const cancelOrderUseCase = containerDI.resolve<CancelOrderUseCase>("cancelOrderUseCase");
  const getKitchenQueueUseCase = containerDI.resolve<GetKitchenQueueUseCase>("getKitchenQueueUseCase");
  const markOrderReadyUseCase = containerDI.resolve<MarkOrderReadyUseCase>("markOrderReadyUseCase");
  const startSessionUseCase = containerDI.resolve<StartSessionUseCase>("startSessionUseCase");
  const endSessionUseCase = containerDI.resolve<EndSessionUseCase>("endSessionUseCase");
  const getActiveSessionByTableUseCase = containerDI.resolve<GetActiveSessionByTableUseCase>("getActiveSessionByTableUseCase");
  // Get all orders
  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await orderRepository.getAll();
      setOrders(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar las órdenes';
      setError(errorMessage);
      console.error('Error loading orders:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get orders by table
  const loadOrdersByTable = useCallback(async (tableId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const tableOrders = await getOrdersByTableUseCase.execute(tableId);
      setOrders(tableOrders);
      return tableOrders;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar las órdenes de la mesa';
      setError(errorMessage);
      console.error('Error loading table orders:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new order (con gestión automática de sesión)
  const createOrder = useCallback(async (
    tableId: string,
    items: OrderDetailItem[]
  ): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);      
      let activeSession = await getActiveSessionByTableUseCase.execute(tableId);
      
      if (!activeSession) {
        console.log('No hay sesión activa, creando nueva sesión para la mesa:', tableId);
        await startSessionUseCase.execute({ tableId });
        activeSession = await getActiveSessionByTableUseCase.execute(tableId);
      }
      
      console.log('Usando sesión activa:', activeSession.id);
      
      const newOrder = await createOrderUseCase.execute(tableId, items);
      
      setOrders(prev => [newOrder, ...prev]);
      setCurrentOrder(newOrder);
      
      return newOrder;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear la orden';
      endSessionUseCase.execute(tableId);
      setError(errorMessage);
      console.error('Error creating order:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update status order
  const updateOrderStatus = useCallback(async (
    orderId: string,
    status: OrderStatus
  ): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedOrder = await updateOrderStatusUseCase.execute(orderId, status);
      
      setOrders(prev =>
        prev.map(order => order.id === orderId ? updatedOrder : order)
      );
      
      if (currentOrder?.id === orderId) {
        setCurrentOrder(updatedOrder);
      }
      
      return updatedOrder;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar el estado';
      setError(errorMessage);
      console.error('Error updating order status:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  // Cancel order
  const cancelOrder = useCallback(async (orderId: string): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const canceledOrder = await cancelOrderUseCase.execute(orderId);
      
      setOrders(prev =>
        prev.map(order => order.id === orderId ? canceledOrder : order)
      );
      
      if (currentOrder?.id === orderId) {
        setCurrentOrder(canceledOrder);
      }
      
      return canceledOrder;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cancelar la orden';
      setError(errorMessage);
      console.error('Error canceling order:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  // Get kitchen queue
  const loadKitchenQueue = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const kitchenOrders = await getKitchenQueueUseCase.execute();
      setOrders(kitchenOrders);
      return kitchenOrders;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar la cola de cocina';
      setError(errorMessage);
      console.error('Error loading kitchen queue:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mark order as ready
  const markOrderReady = useCallback(async (orderId: string): Promise<Order> => {
    try {
      setIsLoading(true);
      setError(null);
      const readyOrder = await markOrderReadyUseCase.execute(orderId);
      
      setOrders(prev =>
        prev.map(order => order.id === orderId ? readyOrder : order)
      );
      
      if (currentOrder?.id === orderId) {
        setCurrentOrder(readyOrder);
      }
      
      return readyOrder;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al marcar la orden como lista';
      setError(errorMessage);
      console.error('Error marking order ready:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  // Clean error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clean current order
  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

// En useOrders.ts, cambia esta función:
const getOrdersByStatus = useCallback((status: OrderStatus) => {
  return orders.filter(order => order.status === status);
}, [orders]);

  // Get order stats
  const getOrderStats = useCallback(() => {
    return {
      total: orders.length,
      confirmed: orders.filter(o => o.status === OrderStatus.Confirmed).length,
      inKitchen: orders.filter(o => o.status === OrderStatus.InKitchen).length,
      ready: orders.filter(o => o.status === OrderStatus.Ready).length,
      served: orders.filter(o => o.status === OrderStatus.Served).length,
      paid: orders.filter(o => o.status === OrderStatus.Paid).length,
      canceled: orders.filter(o => o.status === OrderStatus.Canceled).length,
    };
  }, [orders]);

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    loadOrders,
    loadOrdersByTable,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    loadKitchenQueue,
    markOrderReady,
    clearError,
    clearCurrentOrder,
    getOrdersByStatus,
    getOrderStats,
  };
};