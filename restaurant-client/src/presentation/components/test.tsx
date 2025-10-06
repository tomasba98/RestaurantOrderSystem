import React, { useState } from 'react';
// IMPORTANTE: Importa useTheme
import { Box, Fab, Tooltip, useTheme } from '@mui/material'; 
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Add } from '@mui/icons-material';
import DraggableTable from './DraggableTable';
import OrderModal from './OrderModal';
import type { HallProps, Table, Product, OrderDetailItem } from '@/types';

interface ExtendedHallProps extends HallProps {
  products: Product[];
  onCreateOrder: (tableId: string, items: OrderDetailItem[]) => Promise<void>;
  onToggleTableOccupied: (tableId: string) => void;
  onAddTable?: () => void;
  loading?: boolean;
}

const Hall: React.FC<ExtendedHallProps> = ({
  width = 800,
  height = 600,
  tables,
  setTables,
  products,
  onCreateOrder,
  onToggleTableOccupied,
  onAddTable,
  loading = false,
}) => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  
  // 1. Hook para acceder al tema (incluyendo el tema oscuro)
  const theme = useTheme(); 

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    // ... (lógica de drag and drop sin cambios)
    const { delta, active } = event;
    
    // Prevent dragging outside boundaries
    setTables((prev) =>
      prev.map((table) => {
        if (table.id === active.id) {
          const newX = Math.max(0, Math.min(width - 120, table.x + delta.x));
          const newY = Math.max(0, Math.min(height - 120, table.y + delta.y));
          
          return {
            ...table,
            x: newX,
            y: newY,
          };
        }
        return table;
      })
    );
  };

  const handleCreateOrder = (table: Table) => {
    setSelectedTable(table);
    setOrderModalOpen(true);
  };

  const handleToggleOccupied = (tableId: string) => {
    onToggleTableOccupied(tableId);
  };

  const handleCloseOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedTable(null);
  };

  const handleCreateOrderSubmit = async (tableId: string, items: OrderDetailItem[]) => {
    await onCreateOrder(tableId, items);
    // Mark table as occupied when order is created
    onToggleTableOccupied(tableId);
  };

  // 2. Colores del tema para la leyenda de la mesa
  const tableFreeColor = theme.palette.success.main; // #4caf50
  const tableOccupiedColor = theme.palette.error.main; // #c62828

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          width,
          height,
          // 3. Reemplaza el color de fondo fijo por el fondo 'default' del tema oscuro
          backgroundColor: theme.palette.background.default, 
          // 4. Utiliza el color del divisor o un color primario para el borde
          border: `2px solid ${theme.palette.divider}`,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          // 5. Ajusta el patrón de fondo para el modo oscuro
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      >
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {tables.map((table) => (
            <DraggableTable
              key={table.id}
              table={table}
              onCreateOrder={handleCreateOrder}
              onToggleOccupied={handleToggleOccupied}
            />
          ))}
        </DndContext>

        {/* Add Table Button usa color="primary" y se adapta solo */}
        {onAddTable && (
          <Tooltip title="Agregar Mesa">
            <Fab
              color="primary"
              size="small"
              onClick={onAddTable}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                zIndex: 1,
              }}
            >
              <Add />
            </Fab>
          </Tooltip>
        )}

        {/* Legend */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            // 6. Utiliza 'paper' o un fondo transparente para la leyenda
            backgroundColor: theme.palette.background.paper + 'E0', // 'E0' para un poco de transparencia
            padding: 2,
            borderRadius: 2,
            // 7. El color del texto principal se adapta por defecto, pero lo forzamos si es necesario
            color: theme.palette.text.primary,
            boxShadow: 2,
          }}
        >
          {/* Mesa Libre */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: tableFreeColor,
              }}
            />
            <Box component="span" sx={{ fontSize: '0.8rem' }}>
              Mesa Libre
            </Box>
          </Box>
          {/* Mesa Ocupada */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: tableOccupiedColor,
              }}
            />
            <Box component="span" sx={{ fontSize: '0.8rem' }}>
              Mesa Ocupada
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Order Modal (asumiendo que OrderModal usa el tema por defecto) */}
      <OrderModal
        open={orderModalOpen}
        onClose={handleCloseOrderModal}
        table={selectedTable}
        products={products}
        onCreateOrder={handleCreateOrderSubmit}
        loading={loading}
      />
    </Box>
  );
};

export default Hall;