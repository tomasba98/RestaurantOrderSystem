import React, { useState } from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Add } from '@mui/icons-material';
import type { HallProps, Table } from '@/domain/entities/Table';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import DraggableTable from '../table/DraggableTable';
import OrderModal from '../order/OrderModal';
import OrderCreationDialog from '../order/OrderCreationDialog';


const Hall: React.FC<HallProps> = ({
  width = 800,
  height = 600,
  tables,
  setTables,
  products,
  onCreateOrder,
  onToggleTableOccupied,
  onUpdateTablePosition,
  onAddTable,
  onDeleteTable,
  loading = false,
}) => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { delta, active } = event;
    let newX = 0 ;
    let newY = 0;

    setTables((prev) =>
      prev.map((table) => {
        if (table.id === active.id) {
            newX = Math.max(0, Math.min(width - 120, table.x + delta.x));
            newY = Math.max(0, Math.min(height - 120, table.y + delta.y));
            onUpdateTablePosition?.(active.id, newX, newY); 
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
    onToggleTableOccupied(tableId);
  };

  const handleDeleteTable = (tableId: string) => {
    onDeleteTable?.(tableId);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: -160, 
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: 'rgba(119, 119, 119, 0.9)',
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
          zIndex: 10,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#4caf50',
            }}
          />
          <Box component="span" sx={{ fontSize: '0.8rem' }}>
            Mesa Libre
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#ff5252',
            }}
          />
          <Box component="span" sx={{ fontSize: '0.8rem' }}>
            Mesa Ocupada
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width,
          height,
          backgroundColor: '#a7a724ff',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 1px, transparent 1px)
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
              onDeleteTable={handleDeleteTable}
            />
          ))}
        </DndContext>

        {/* Add Table Button */}
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
      </Box>

      {/* Order Modal */}
      {/* <OrderModal
        open={orderModalOpen}
        table={selectedTable}
        products={products}
        onClose={handleCloseOrderModal}
        onCreateOrder={handleCreateOrderSubmit}
        loading={loading}
      />       */}
      <OrderCreationDialog
        open={orderModalOpen}
        table={selectedTable}
        products={products}
        onClose={handleCloseOrderModal}
        onCreateOrder={handleCreateOrderSubmit}
        loading={loading}
      />      
    </Box>
  );
};

export default Hall;

