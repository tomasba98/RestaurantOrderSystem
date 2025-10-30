// src/aplication/hooks/order/useOrders.ts
import { useState, useCallback } from 'react';
import type { Order } from '@/domain/entities/Order';
import { OrderStatus } from '@/domain/entities/Order';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import type { PaginationParams } from '@/utils/Pagination';
import { OrderRepositoryImpl } from '@/infrastructure/repositories/OrderRepositoryImpl';
import { TableRepositoryImpl } from '@/infrastructure/repositories/TableRepositoryImpl';
import { SessionRepositoryImpl } from '@/infrastructure/repositories/SessionRepositoryImpl';
import { CreateOrderUseCase } from '@/domain/usecases/order/CreateOrderUseCase';
import { GetOrdersByTableUseCase } from '@/domain/usecases/order/GetOrdersByTableUseCase';
import { UpdateOrderStatusUseCase } from '@/domain/usecases/order/UpdateOrderStatusUseCase';
import { CancelOrderUseCase } from '@/domain/usecases/order/CancelOrderUseCase';
import { GetAllOrdersUseCase } from '@/domain/usecases/order/GetAllOrdersUseCase';
import { GetKitchenQueueUseCase } from '@/domain/usecases/order/GetkitchenQueueUseCase';
import { MarkOrderReadyUseCase } from '@/domain/usecases/order/MarkOrderReadyUseCase';
import { StartSessionUseCase } from '@/domain/usecases/session/StartSessionUseCase';
import { GetActiveSessionByTableUseCase } from '@/domain/usecases/session/GetActiveSessionByTableUseCase';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const orderRepository = new OrderRepositoryImpl();
  const tableRepository = new TableRepositoryImpl();
  const sessionRepository = new SessionRepositoryImpl();
  
  const createOrderUseCase = new CreateOrderUseCase(orderRepository, tableRepository);
  const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
  const getOrdersByTableUseCase = new GetOrdersByTableUseCase(orderRepository);
  const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);
  const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);
  const getKitchenQueueUseCase = new GetKitchenQueueUseCase(orderRepository);
  const markOrderReadyUseCase = new MarkOrderReadyUseCase(orderRepository);
  const startSessionUseCase = new StartSessionUseCase(sessionRepository);
  const getActiveSessionByTableUseCase = new GetActiveSessionByTableUseCase(sessionRepository);

  // Get all orders
  const loadOrders = useCallback(async (params?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllOrdersUseCase.execute(params);
      setOrders(response.items);
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
      
      // 1. Verificar si existe una sesión activa, si no, crear una
      let activeSession = await getActiveSessionByTableUseCase.execute(tableId);
      
      if (!activeSession) {
        console.log('No hay sesión activa, creando nueva sesión para la mesa:', tableId);
        await startSessionUseCase.execute({ tableId });
        // Recargar sesiones activas
        activeSession = await getActiveSessionByTableUseCase.execute(tableId);
      }
      
      console.log('Usando sesión activa:', activeSession.id);
      
      // 2. Crear la orden
      const newOrder = await createOrderUseCase.execute(tableId, items);
      
      // 3. Actualizar estado local
      setOrders(prev => [newOrder, ...prev]);
      setCurrentOrder(newOrder);
      
      return newOrder;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear la orden';
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

  // Get orders by status
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