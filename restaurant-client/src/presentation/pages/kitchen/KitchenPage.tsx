import React, { useEffect, useState } from 'react';
import {  Box,  Container,  Typography,  Button,  CircularProgress,  Alert,  IconButton,  Grid,} from '@mui/material';
import { Refresh, Kitchen, RestaurantMenu } from '@mui/icons-material';

import { useOrders } from '@/aplication/hooks/order/useOrders';
import { OrderStatus } from '@/domain/entities/Order';
import OrderKitchenCard from '@/presentation/components/order/OrderKitchenCard';

const KitchenPage: React.FC = () => {
  const {
    orders,
    isLoading,
    error,
    loadKitchenQueue,
    updateOrderStatus,
    clearError,
  } = useOrders();

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadKitchenQueue();
  }, []);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(loadKitchenQueue, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, loadKitchenQueue]);

  const handleRefresh = () => {
    loadKitchenQueue();
  };

  const handleMarkReady = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, OrderStatus.Ready);
    } catch (err) {
      console.error('Error marking order ready:', err);
    }
  };

  const handleMarkInKitchen = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, OrderStatus.InKitchen);
    } catch (err) {
      console.error('Error marking order ready:', err);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, OrderStatus.Canceled);
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  };

  if (isLoading && orders.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const confirmedOrders = orders.filter(o => o.status === OrderStatus.Confirmed);
  const inKitchenOrders = orders.filter(o => o.status === OrderStatus.InKitchen);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Cola de Cocina
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {confirmedOrders.length} pendientes • {inKitchenOrders.length} en preparación
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant={autoRefresh ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            Auto-actualizar {autoRefresh ? 'ON' : 'OFF'}
          </Button>
          <IconButton onClick={handleRefresh} disabled={isLoading}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Pending Orders Section */}
      {confirmedOrders.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantMenu /> Órdenes Pendientes ({confirmedOrders.length})
          </Typography>
          <Grid container spacing={2} mb={4}>
            {confirmedOrders.map((order) => (
              <OrderKitchenCard
                key={order.id}
                order={order}
                onMarkInKitchen={handleMarkInKitchen}
                onMarkReady={handleMarkReady}
                onCancel={handleCancelOrder}
              />
            ))}
          </Grid>
        </>
      )}

      {/* In Kitchen Section */}
      {inKitchenOrders.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Kitchen /> En Preparación ({inKitchenOrders.length})
          </Typography>
          <Grid container spacing={2}>
            {inKitchenOrders.map((order) => (
              <OrderKitchenCard
                key={order.id}
                order={order}
                onMarkInKitchen={handleMarkInKitchen}
                onMarkReady={handleMarkReady}
                onCancel={handleCancelOrder}
              />
            ))}
          </Grid>
        </>
      )}

      {/* Empty State */}
      {orders.length === 0 && !isLoading && (
        <Box textAlign="center" py={8}>
          <Kitchen sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No hay órdenes en la cola
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Las nuevas órdenes aparecerán aquí automáticamente
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default KitchenPage;