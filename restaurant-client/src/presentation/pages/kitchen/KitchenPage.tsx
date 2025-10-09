import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';

import {
  Refresh,
  Kitchen,
  CheckCircle,
  Cancel,
  Timer,
  RestaurantMenu,
} from '@mui/icons-material';

import { useOrders } from '@/aplication/hooks/order/useOrders';
import { OrderStatus } from '@/domain/entities/Order';
import type { Order } from '@/domain/entities/Order';

const KitchenPage: React.FC = () => {
  const {
    orders,
    isLoading,
    error,
    loadKitchenQueue,
    updateOrderStatus,
    markOrderReady,
    cancelOrder,
    clearError,
  } = useOrders();

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadKitchenQueue();
  }, []);

  // Auto-refresh cada 30 segundos
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadKitchenQueue();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    loadKitchenQueue();
  };

  const handleStartCooking = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, OrderStatus.InKitchen);
    } catch (err) {
      console.error('Error starting order:', err);
    }
  };

  const handleMarkReady = async (orderId: string) => {
    try {
      await markOrderReady(orderId);
    } catch (err) {
      console.error('Error marking order ready:', err);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  };

  const getOrderAge = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);

    if (diffMinutes < 1) return 'Recién creada';
    if (diffMinutes === 1) return '1 minuto';
    if (diffMinutes < 60) return `${diffMinutes} minutos`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getUrgencyColor = (createdAt: string): "default" | "warning" | "error" => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);

    if (diffMinutes < 15) return 'default';
    if (diffMinutes < 30) return 'warning';
    return 'error';
  };

  const renderOrderCard = (order: Order) => {
    const isConfirmed = order.status === OrderStatus.Confirmed;
    const isInKitchen = order.status === OrderStatus.InKitchen;

    return (
    <Grid container  key={order.id} spacing={2}>
        <Grid  size={{ xs: 12, sm: 6, md: 4}} >
            <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: isConfirmed ? '2px solid #ff9800' : 'none',
                boxShadow: isConfirmed ? 4 : 2,
            }}
            >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="div">
                    Mesa #{order.tableId.slice(-4)}
                </Typography>
                <Chip
                    icon={<Timer fontSize="small" />}
                    label={getOrderAge(order.createdAt)}
                    color={getUrgencyColor(order.createdAt)}
                    size="small"
                />
                </Box>

                <Chip
                label={isConfirmed ? 'Confirmada' : 'En Cocina'}
                color={isConfirmed ? 'info' : 'warning'}
                icon={isConfirmed ? <RestaurantMenu /> : <Kitchen />}
                size="small"
                sx={{ mb: 2 }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                Productos:
                </Typography>
                <List dense>
                {order.productList.map((item) => (
                    <ListItem key={item.id} sx={{ px: 0 }}>
                    <ListItemText
                        primary={
                        <Typography variant="body2">
                            <strong>{item.quantity}x</strong> Producto {item.productId.slice(-4)}
                        </Typography>
                        }
                    />
                    </ListItem>
                ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    Total:
                </Typography>
                <Typography variant="h6" color="primary">
                    ${order.totalAmount.toFixed(2)}
                </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                Creada: {new Date(order.createdAt).toLocaleTimeString()}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                size="small"
                color="error"
                onClick={() => handleCancelOrder(order.id)}
                startIcon={<Cancel />}
                >
                Cancelar
                </Button>
                {isConfirmed && (
                <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    onClick={() => handleStartCooking(order.id)}
                    startIcon={<Kitchen />}
                    fullWidth
                >
                    Comenzar
                </Button>
                )}
                {isInKitchen && (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleMarkReady(order.id)}
                    startIcon={<CheckCircle />}
                    fullWidth
                >
                    Lista
                </Button>
                )}
            </CardActions>
            </Card>
        </Grid>
      </Grid>
    );
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
            {confirmedOrders.map(renderOrderCard)}
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
            {inKitchenOrders.map(renderOrderCard)}
          </Grid>
        </>
      )}

      {/* Empty State */}
      {orders.length === 0 && (
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