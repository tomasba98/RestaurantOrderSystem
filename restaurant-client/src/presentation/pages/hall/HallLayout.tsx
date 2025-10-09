import { useState } from 'react';
import { Box, Snackbar, Alert, Typography, useTheme, CircularProgress } from '@mui/material';
import Hall from '@/presentation/components/hall/Hall';
import { useTables } from '@/aplication/hooks/table/useTables';
import type { Product } from '@/domain/entities/Product';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';

// Mock products - temporalmente hasta que refactorices productos
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    price: 12.99,
    description: 'Carne de res, lechuga, tomate, cebolla y queso',
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Pizza Margarita',
    price: 16.50,
    description: 'Salsa de tomate, mozzarella y albahaca fresca',
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Ensalada César',
    price: 9.99,
    description: 'Lechuga romana, pollo, crutones y aderezo césar',
    isAvailable: true,
    createdAt: new Date().toISOString(),
  },
];

const HallLayout = () => {
  const {
    tables,
    isLoading,
    error,
    setTables,
    createTable,
    updateTablePosition,
    deleteTable,
    toggleTableOccupation,
    clearError,
  } = useTables();

  const [products] = useState<Product[]>(mockProducts);
  const [orderLoading, setOrderLoading] = useState(false);
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

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
    clearError();
  };

  const handleCreateOrder = async (tableId: string, items: OrderDetailItem[]) => {
    setOrderLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const table = tables.find(t => t.id === tableId);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      console.log('Creating order:', { tableId, items });

      showNotification(
        `¡Orden creada exitosamente! Mesa ${table?.number} - ${totalItems} productos`,
        'success'
      );
    } catch (error) {
      console.error('Error creating order:', error);
      showNotification('Error al crear la orden. Intenta de nuevo.', 'error');
    } finally {
      setOrderLoading(false);
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
    } catch (error) {
      console.error('Error deleting table:', error);
      showNotification('Error al eliminar la mesa', 'error');
    }
  };

  // Mostrar loading inicial
  if (isLoading && tables.length === 0) {
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
          Cargando mesas...
        </Typography>
      </Box>
    );
  }

  const occupiedTables = tables.filter(table => table.isOccupied).length;
  const totalTables = tables.length;

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
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Mesas
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {occupiedTables} de {totalTables} mesas ocupadas
        </Typography>
      </Box>

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
        open={notification.open || !!error}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={error ? 'error' : notification.severity}
          sx={{ width: '100%' }}
        >
          {error || notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HallLayout;