import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert, Typography, useTheme, CircularProgress, Paper, Chip } from '@mui/material';
import { AccessTime, CheckCircle } from '@mui/icons-material';
import Hall from '@/presentation/components/hall/Hall';
import { useTables } from '@/aplication/hooks/table/useTables';
import { useProducts } from '@/aplication/hooks/product/useProducts';
import { useOrders } from '@/aplication/hooks/order/useOrders';
import { useSession } from '@/aplication/hooks/session/useSession';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';

const HallLayout = () => {
  const {
    tables,
    isLoading: tablesLoading,
    error: tablesError,
    setTables,
    createTable,
    updateTablePosition,
    deleteTable,
    toggleTableOccupation,
    clearError: clearTablesError,
  } = useTables();

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    loadAvailableProducts,
    clearError: clearProductsError,
  } = useProducts();

  const {
    createOrder,
    isLoading: orderLoading,
    error: orderError,
    clearError: clearOrderError,
  } = useOrders();

  const {
    sessions,
    loadSessions,
    getActiveSessions,
    getSessionStats,
  } = useSession();

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const theme = useTheme();

  useEffect(() => {
    loadAvailableProducts();
    loadSessions();
  }, []);

  // refresh sesion 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadSessions();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
    clearTablesError();
    clearProductsError();
    clearOrderError();
  };

  const handleCreateOrder = async (tableId: string, items: OrderDetailItem[]) => {
    try {
      const order = await createOrder(tableId, items);        
      const table = tables.find(t => t.id === tableId);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      showNotification(
        `¡Orden creada exitosamente! Mesa ${table?.number} - ${totalItems} productos - Total: $${order.totalAmount.toFixed(2)}`,
        'success'
      );

      if (table && !table.isOccupied) {
        await toggleTableOccupation(tableId);
      }

      loadSessions();
    } catch (error: any) {
      console.error('Error creating order:', error);
      showNotification(error.message || 'Error al crear la orden', 'error');
    }
  };

  const handleToggleTableOccupied = async (tableId: string) => {
    try {
      await toggleTableOccupation(tableId);
      const table = tables.find(t => t.id === tableId);
      const newStatus = !table?.isOccupied;
      showNotification(
        `Mesa ${table?.number} ${newStatus ? 'marcada como ocupada' : 'liberada'}`,
        'info'
      );

      // Reload sessions after toggling occupation
      loadSessions();
    } catch (error) {
      console.error('Error updating table occupation:', error);
      showNotification('Error al actualizar el estado de la mesa', 'error');
    }
  };

  const handleAddTable = async () => {
    try {
      const newTableNumber = tables.length > 0
        ? Math.max(...tables.map(t => t.number)) + 1
        : 1;

      await createTable({
        number: newTableNumber,
        x: 30,
        y: 30,
        isOccupied: false,
      });

      showNotification(`Mesa ${newTableNumber} agregada`, 'success');
    } catch (error) {
      console.error('Error adding table:', error);
      showNotification('Error al agregar la mesa', 'error');
    }
  };

  const handleUpdateTablePosition = async (tableId: string, x: number, y: number) => {
    try {
      await updateTablePosition(tableId, x, y);
    } catch (error) {
      console.error('Error updating table position:', error);
      showNotification('Error al actualizar la posición de la mesa', 'error');
    }
  };

  const handleDeleteTable = async (tableId: string) => {
    try {
      const table = tables.find(t => t.id === tableId);
      await deleteTable(tableId);
      showNotification(`Mesa ${table?.number} eliminada`, 'success');
    } catch (error: any) {
      console.error('Error deleting table:', error);
      showNotification(error.message || 'Error al eliminar la mesa', 'error');
    }
  };

  const getSessionDuration = (sessionId: string): string => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return '';
    
    const start = new Date(session.createdAt);
    const now = new Date();
    const durationMs = now.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);
    
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Show loading state
  if ((tablesLoading || productsLoading) && tables.length === 0 && products.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="body1" color="text.secondary">
          Cargando datos...
        </Typography>
      </Box>
    );
  }

  const occupiedTables = tables.filter(table => table.isOccupied).length;
  const totalTables = tables.length;
  const availableProducts = products.length;
  const activeSessions = getActiveSessions();
  const sessionStats = getSessionStats();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: theme.palette.background.default,
        p: 2
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2, textAlign: 'center', width: '100%', maxWidth: 1200 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Mesas
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Chip 
            label={`${occupiedTables} de ${totalTables} mesas ocupadas`}
            color="primary"
            variant="outlined"
          />
          <Chip 
            label={`${availableProducts} productos disponibles`}
            color="secondary"
            variant="outlined"
          />
          <Chip 
            icon={<AccessTime />}
            label={`${sessionStats.active} sesiones activas`}
            color="success"
            variant="outlined"
          />
          <Chip 
            icon={<CheckCircle />}
            label={`${sessionStats.completed} completadas`}
            color="default"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Active Sessions Info */}
      {activeSessions.length > 0 && (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 2, 
            mb: 2, 
            width: '100%', 
            maxWidth: 1200,
            backgroundColor: theme.palette.background.paper 
          }}
        >
          <Typography variant="h6" gutterBottom>
            Sesiones Activas
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {activeSessions.map(session => {
              const table = tables.find(t => t.id === session.tableId);
              return (
                <Chip
                  key={session.id}
                  icon={<AccessTime />}
                  label={`Mesa ${table?.number || '?'}: ${getSessionDuration(session.id)}`}
                  color="success"
                  size="small"
                />
              );
            })}
          </Box>
        </Paper>
      )}

      {/* Hall Component */}
      <Hall
        width={1000}
        height={700}
        tables={tables}
        setTables={setTables}
        products={products}
        onCreateOrder={handleCreateOrder}
        onToggleTableOccupied={handleToggleTableOccupied}
        onAddTable={handleAddTable}
        onUpdateTablePosition={handleUpdateTablePosition}
        onDeleteTable={handleDeleteTable}
        loading={orderLoading}
      />

      {/* Notifications */}
      <Snackbar
        open={notification.open || !!tablesError || !!productsError || !!orderError}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={
            tablesError || productsError || orderError
              ? 'error'
              : notification.severity
          }
          sx={{ width: '100%' }}
        >
          {tablesError || productsError || orderError || notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HallLayout;