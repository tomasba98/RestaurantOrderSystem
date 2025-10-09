import React, { useEffect, useState } from 'react';
import {  Box,  Container,  Typography,  Card,  CardContent,  Grid,  Chip,  Button,  IconButton,  CircularProgress,  Alert,  Tabs,  Tab,  Dialog,  DialogTitle,  DialogContent,  DialogActions,  List,  ListItem,  ListItemText,  Divider,} from '@mui/material';
import {  Refresh,  Cancel,  CheckCircle,  Kitchen,  Restaurant,  LocalShipping,  Receipt,} from '@mui/icons-material';
import { useOrders } from '@/aplication/hooks/order/useOrders';
import { OrderStatus } from '@/domain/entities/Order';
import type { Order } from '@/domain/entities/Order';

const OrdersPage: React.FC = () => {
  const {
    orders,
    isLoading,
    error,
    loadOrders,
    updateOrderStatus,
    cancelOrder,
    clearError,
    getOrdersByStatus,
    getOrderStats,
  } = useOrders();

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleRefresh = () => {
    loadOrders();
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      handleCloseDialog();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      handleCloseDialog();
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  };

  const getStatusColor = (status: OrderStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case OrderStatus.Confirmed:
        return 'info';
      case OrderStatus.InKitchen:
        return 'warning';
      case OrderStatus.Ready:
        return 'success';
      case OrderStatus.Served:
        return 'primary';
      case OrderStatus.Paid:
        return 'success';
      case OrderStatus.Canceled:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Confirmed:
        return <Receipt fontSize="small" />;
      case OrderStatus.InKitchen:
        return <Kitchen fontSize="small" />;
      case OrderStatus.Ready:
        return <LocalShipping fontSize="small" />;
      case OrderStatus.Served:
        return <Restaurant fontSize="small" />;
      case OrderStatus.Paid:
        return <CheckCircle fontSize="small" />;
      case OrderStatus.Canceled:
        return <Cancel fontSize="small" />;
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.Confirmed]: 'Confirmada',
      [OrderStatus.InKitchen]: 'En Cocina',
      [OrderStatus.Ready]: 'Lista',
      [OrderStatus.Served]: 'Servida',
      [OrderStatus.Paid]: 'Pagada',
      [OrderStatus.Canceled]: 'Cancelada',
    };
    return labels[status];
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const transitions: Record<OrderStatus, OrderStatus | null> = {
      [OrderStatus.Confirmed]: OrderStatus.InKitchen,
      [OrderStatus.InKitchen]: OrderStatus.Ready,
      [OrderStatus.Ready]: OrderStatus.Served,
      [OrderStatus.Served]: OrderStatus.Paid,
      [OrderStatus.Paid]: null,
      [OrderStatus.Canceled]: null,
    };
    return transitions[currentStatus];
  };

  const filterOrdersByTab = () => {
    switch (currentTab) {
      case 0: // Todas
        return orders.filter(o => o.status !== OrderStatus.Paid && o.status !== OrderStatus.Canceled);
      case 1: // Pendientes
        return getOrdersByStatus(OrderStatus.Confirmed);
      case 2: // En Cocina
        return getOrdersByStatus(OrderStatus.InKitchen);
      case 3: // Listas
        return getOrdersByStatus(OrderStatus.Ready);
      case 4: // Completadas
        return [...getOrdersByStatus(OrderStatus.Paid), ...getOrdersByStatus(OrderStatus.Canceled)];
      default:
        return orders;
    }
  };

  const stats = getOrderStats();
  const filteredOrders = filterOrdersByTab();

  if (isLoading && orders.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestión de Órdenes
        </Typography>
        <IconButton onClick={handleRefresh} disabled={isLoading}>
          <Refresh />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Activas
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Confirmadas
              </Typography>
              <Typography variant="h4">{stats.confirmed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                En Cocina
              </Typography>
              <Typography variant="h4">{stats.inKitchen}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Listas
              </Typography>
              <Typography variant="h4">{stats.ready}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Servidas
              </Typography>
              <Typography variant="h4">{stats.served}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid  size={{ xs: 12, sm: 6, md: 2}} >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Pagadas
              </Typography>
              <Typography variant="h4">{stats.paid}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Todas" />
          <Tab label="Pendientes" />
          <Tab label="En Cocina" />
          <Tab label="Listas" />
          <Tab label="Completadas" />
        </Tabs>
      </Box>

      {/* Orders Grid */}
      <Grid container spacing={2}>
        {filteredOrders.length === 0 ? (
          <Grid size={{ xs: 12}}>
            <Alert severity="info">No hay órdenes en esta categoría</Alert>
          </Grid>
        ) : (
          filteredOrders.map((order) => (
            <Grid  size={{ xs: 12, sm: 6, md: 2, lg: 3}} key={order.id} >
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleOrderClick(order)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div">
                      Mesa #{order.tableId.slice(-4)}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={getStatusLabel(order.status)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {order.productList.length} productos
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Order Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>
              Orden - Mesa #{selectedOrder.tableId.slice(-4)}
            </DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <Chip
                  icon={getStatusIcon(selectedOrder.status)}
                  label={getStatusLabel(selectedOrder.status)}
                  color={getStatusColor(selectedOrder.status)}
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Productos:
              </Typography>
              <List dense>
                {selectedOrder.productList.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`Producto ${item.productId.slice(-4)}`}
                      secondary={`Cantidad: ${item.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </Typography>
              </Box>
              
              <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                Creada: {new Date(selectedOrder.createdAt).toLocaleString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              {selectedOrder.status !== OrderStatus.Canceled &&
                selectedOrder.status !== OrderStatus.Paid && (
                  <Button
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    color="error"
                    startIcon={<Cancel />}
                  >
                    Cancelar Orden
                  </Button>
                )}
              
              {getNextStatus(selectedOrder.status) && (
                <Button
                  onClick={() =>
                    handleStatusChange(
                      selectedOrder.id,
                      getNextStatus(selectedOrder.status)!
                    )
                  }
                  variant="contained"
                  startIcon={getStatusIcon(getNextStatus(selectedOrder.status)!)}
                >
                  {getStatusLabel(getNextStatus(selectedOrder.status)!)}
                </Button>
              )}
              
              <Button onClick={handleCloseDialog}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default OrdersPage;