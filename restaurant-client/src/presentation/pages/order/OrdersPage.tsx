import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Chip, Button, IconButton, CircularProgress, Alert, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Divider, } from '@mui/material';
import { Refresh, Cancel, CheckCircle, Kitchen, Restaurant, LocalShipping, Receipt, } from '@mui/icons-material';
import { useOrders } from '@/aplication/hooks/order/useOrders';
import { OrderStatus } from '@/domain/entities/Order';
import type { Order } from '@/domain/entities/Order';
import OrderDetailDialog from '@/presentation/components/order/OrderDetailDialog';

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

  useEffect(() => {
    if (selectedOrder) {
      const updated = orders.find(o => o.id === selectedOrder.id);
      if (updated) setSelectedOrder(updated);
    }
  }, [orders]);


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

  const getStatusChipColor = (status: OrderStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
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

  const filterOrdersByTab = () => {
    switch (currentTab) {
      case 0: // Todas
        return orders;
      case 1:
        return getOrdersByStatus(OrderStatus.Confirmed);
      case 2:
        return getOrdersByStatus(OrderStatus.InKitchen);
      case 3:
        return getOrdersByStatus(OrderStatus.Ready);
      case 4:
        return getOrdersByStatus(OrderStatus.Served);
      case 5:
        return getOrdersByStatus(OrderStatus.Paid);
      case 6:
        return getOrdersByStatus(OrderStatus.Canceled);
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

      {/* Todas */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12 }}>
          <Card
            onClick={() => setCurrentTab(0)}
            sx={{
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 4 },
              textAlign: 'center'
            }}
          >
            <CardContent sx={{ pb: '16px !important' }}>
              {/* Centra el bloque entero */}
              <Box display="flex" justifyContent="center">
                {/* Bloque con ancho según contenido */}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left'
                  }}
                >
                  {/* fila: título + chip */}
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography color="textSecondary" variant="h5">
                      Todas
                    </Typography>

                    <Chip size="small" icon={<Receipt />} label="Todas" />
                  </Box>

                  {/* número alineado al inicio del título */}
                  <Typography variant="h4">
                    {stats.total}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

          </Card>
        </Grid>
      </Grid>



      <Grid container spacing={2} mb={3}>

        {/* Confirmadas */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(1)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  Confirmadas
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.Confirmed)}
                  label={getStatusLabel(OrderStatus.Confirmed)}
                  color={getStatusChipColor(OrderStatus.Confirmed)}
                />
              </Box>

              <Typography variant="h4">{stats.confirmed}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* En Cocina */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(2)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  En Cocina
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.InKitchen)}
                  label={getStatusLabel(OrderStatus.InKitchen)}
                  color={getStatusChipColor(OrderStatus.InKitchen)}
                />
              </Box>

              <Typography variant="h4">{stats.inKitchen}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Listas */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(3)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  Listas
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.Ready)}
                  label={getStatusLabel(OrderStatus.Ready)}
                  color={getStatusChipColor(OrderStatus.Ready)}
                />
              </Box>

              <Typography variant="h4">{stats.ready}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Servidas */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(4)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  Servidas
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.Served)}
                  label={getStatusLabel(OrderStatus.Served)}
                  color={getStatusChipColor(OrderStatus.Served)}
                />
              </Box>

              <Typography variant="h4">{stats.served}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pagadas */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(5)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  Pagadas
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.Paid)}
                  label={getStatusLabel(OrderStatus.Paid)}
                  color={getStatusChipColor(OrderStatus.Paid)}
                />
              </Box>

              <Typography variant="h4">{stats.paid}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Canceladas */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card
            onClick={() => setCurrentTab(6)}
            sx={{ cursor: 'pointer', transition: '0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 4 } }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography color="textSecondary" variant="body2">
                  Canceladas
                </Typography>

                <Chip
                  size="small"
                  icon={getStatusIcon(OrderStatus.Canceled)}
                  label={getStatusLabel(OrderStatus.Canceled)}
                  color={getStatusChipColor(OrderStatus.Canceled)}
                />
              </Box>

              <Typography variant="h4">{stats.canceled}</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Divider sx={{ my: 3, opacity: 0.8 }} />


      {/* Stats Cards
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Todas" />
          <Tab label="Pendientes" />
          <Tab label="En Cocina" />
          <Tab label="Listas" />
          <Tab label="Servidas" />
          <Tab label="Pagadas" />
          <Tab label="Canceladas" />
        </Tabs>
      </Box> */}

      {/* Orders Grid */}
      <Grid container spacing={2}>
        {filteredOrders.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="info">No hay órdenes en esta categoría</Alert>
          </Grid>
        ) : (
          filteredOrders.map((order) => (
            <Grid size={{ xs: 12, sm: 6, md: 2, lg: 3 }} key={order.id} >
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
                      Mesa #{order.tableNumber}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={getStatusLabel(order.status)}
                      color={getStatusChipColor(order.status)}
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

      <OrderDetailDialog
        open={dialogOpen}
        order={selectedOrder}
        onClose={handleCloseDialog}
        onCancelOrder={handleCancelOrder}
        onStatusChange={handleStatusChange}
        getStatusIcon={getStatusIcon}
        getStatusLabel={getStatusLabel}
        getStatusChipColor={getStatusChipColor}
      />

    </Container>
  );
};

export default OrdersPage;