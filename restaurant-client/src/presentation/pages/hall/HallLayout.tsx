import { useState, useEffect } from 'react';
import { Box, Snackbar, Alert, Typography, useTheme } from '@mui/material';
import type { Product } from '@/domain/entities/Product';
import type { Table, TableRequest } from '@/domain/entities/Table';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';

// Mock products permanece igual
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
  // ... resto de los productos
];

const HallLayout = () => {
//   const [tables, setTables] = useState<Table[]>([]);
//   const [products] = useState<Product[]>(mockProducts);
//   const [loading, setLoading] = useState(false);
//   const [tablesLoading, setTablesLoading] = useState(true);
//   const [notification, setNotification] = useState<{
//       open: boolean;
//       message: string;
//       severity: 'success' | 'error' | 'info';
//   }>({
//       open: false,
//       message: '',
//       severity: 'info',
//   });

//   useEffect(() => {
//     loadTables();
//   }, []);

//   const loadTables = async () => {
//     try {
//       setTablesLoading(true);
//       const tablesData = await tableService.getAll();
      
//       const formattedTables: Table[] = tablesData.map(table => ({
//         id: table.id,
//         number: table.number,
//         x: table.x ,
//         y: table.y ,
//         isOccupied: table.isOccupied,
//         createdAt: table.createdAt,
//       }));
      
//       setTables(formattedTables);
//     } catch (error) {
//       console.error('Error loading tables:', error);
//       showNotification('Error al cargar las mesas', 'error');
//     } finally {
//       setTablesLoading(false);
//     }
//   };

//   const showNotification = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
//       setNotification({ open: true, message, severity });
//   };

//   const handleCloseNotification = () => {
//       setNotification(prev => ({ ...prev, open: false }));
//   };

//   const handleCreateOrder = async (tableId: string, items: OrderDetailItem[]) => {
//       setLoading(true);
//       try {
//           // Simulate API call
//           await new Promise(resolve => setTimeout(resolve, 1500));
          
//           const table = tables.find(t => t.id === tableId);
//           const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
          
//           console.log('Creating order:', { tableId, items });
          
//           showNotification(
//               `¡Orden creada exitosamente! Mesa ${table?.number} - ${totalItems} productos`,
//               'success'
//           );
//       } catch (error) {
//           console.error('Error creating order:', error);
//           showNotification('Error al crear la orden. Intenta de nuevo.', 'error');
//       } finally {
//           setLoading(false);
//       }
//   };

//   const handleToggleTableOccupied = async (tableId: string) => {
//     try {
//       const table = tables.find(t => t.id === tableId);
//       if (!table) return;

//       const newOccupationStatus = await tableService.setOccupation(tableId, !table.isOccupied);
      
//       setTables(prev =>
//         prev.map(table =>
//           table.id === tableId
//             ? { ...table, isOccupied: newOccupationStatus }
//             : table
//         )
//       );

//       showNotification(
//         `Mesa ${table.number} ${newOccupationStatus ? 'marcada como ocupada' : 'liberada'}`,
//         'info'
//       );
//     } catch (error) {
//       console.error('Error updating table occupation:', error);
//       showNotification('Error al actualizar el estado de la mesa', 'error');
//     }
//   };

//   const handleAddTable = async () => {
//     try {
//       const newTableNumber = tables.length > 0 
//         ? Math.max(...tables.map(t => t.number)) + 1 
//         : 1;

//       const tableRequest: TableRequest = {
//         number: newTableNumber,
//         x: 1,
//         y: 1,
//         isOccupied: false,
//       };

//       const newTable = await tableService.create(tableRequest);
      
//       // Agregar la nueva mesa al estado local
//       setTables(prev => [...prev, {
//         id: newTable.id,
//         number: newTable.number,
//         x: newTable.x,
//         y: newTable.y,
//         isOccupied: newTable.isOccupied,
//         createdAt: newTable.createdAt,
//       }]);

//       showNotification(`Mesa ${newTableNumber} agregada`, 'success');
//     } catch (error) {
//       console.error('Error adding table:', error);
//       showNotification('Error al agregar la mesa', 'error');
//     }
//   };


//   const handleUpdateTablePosition = async (tableId: string, x: number, y: number) => {
//     try {
//       await tableService.update(tableId, { x, y });
      
//       setTables(prev =>
//         prev.map(table =>
//           table.id === tableId
//             ? { ...table, x, y }
//             : table
//         )
//       );
//     } catch (error) {
//       console.error('Error updating table position:', error);
//       showNotification('Error al actualizar la posición de la mesa', 'error');
//     }
//   };

//   const handleDeleteTable = async (tableId: string) => {
//     try {
//       await tableService.delete(tableId);
      
//       setTables(prev => prev.filter(table => table.id !== tableId));
      
//       const table = tables.find(t => t.id === tableId);
//       showNotification(`Mesa ${table?.number} eliminada`, 'success');
//     } catch (error) {
//       console.error('Error deleting table:', error);
//       showNotification('Error al eliminar la mesa', 'error');
//     }
//   };

//   const occupiedTables = tables.filter(table => table.isOccupied).length;
//   const totalTables = tables.length;

//   const theme = useTheme();

//   if (tablesLoading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography>Cargando mesas...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//       sx={{ 
//         backgroundColor: theme.palette.background.default, 
//         p: 2 
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ mb: 2, textAlign: 'center' }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Gestión de Mesas
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {occupiedTables} de {totalTables} mesas ocupadas
//         </Typography>
//       </Box>

//       <Hall
//         width={1000}
//         height={700}
//         tables={tables}
//         setTables={setTables}
//         products={products}
//         onCreateOrder={handleCreateOrder}
//         onToggleTableOccupied={handleToggleTableOccupied}
//         onAddTable={handleAddTable}
//         onUpdateTablePosition={handleUpdateTablePosition}
//         onDeleteTable={handleDeleteTable}
//         loading={loading}
//       />

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };
}
export default HallLayout;