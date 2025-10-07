import { useDraggable } from "@dnd-kit/core";
import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import { AddShoppingCart, TableRestaurant, Person } from "@mui/icons-material";
import { tableService } from "@/services/api";
import type { Table } from "@/domain/entities/Table";

interface DraggableTableProps {
  table: Table;
  onCreateOrder: (table: Table) => void;
  onToggleOccupied: (tableId: string) => void;
}
function DraggableTable({ table, onCreateOrder, onToggleOccupied }: DraggableTableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: table.id });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${table.x + transform.x}px, ${table.y + transform.y}px, 0)`
      : `translate3d(${table.x}px, ${table.y}px, 0)`,
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  };

  const handleCreateOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCreateOrder(table);
  };

  const handleToggleOccupied = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("handleToggleOccupied");
    onToggleOccupied(table.id);
    // try {
    //   await tableService.setOccupation(table.id, !table.isOccupied);
    // } catch (error) {
    //   console.error("Error while updating occupation:", error);
    // }
  };
  

  return (
    <div style={style}>
      {/*Draggable area - Table*/}
      <div 
        ref={setNodeRef} 
        {...listeners} 
        {...attributes}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'move',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: table.isOccupied ? '#ff5252' : 'white',
            color: 'black',
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <TableRestaurant sx={{ fontSize: 20, mb: 0.5 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Mesa {table.number}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9 }}>
              {table.isOccupied ? 'Ocupada' : 'Libre'}
            </Typography>
          </Box>
        </Paper>
      </div>

      {/* Action buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: -15,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          zIndex: 10, 
        }}
      >
        <Tooltip title="Crear Orden">
          <IconButton
            size="small"
            onClick={handleCreateOrder}
            sx={{
              backgroundColor: '#2196f3',
              color: 'white',
              width: 30,
              height: 30,
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <AddShoppingCart sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={table.isOccupied ? 'Liberar Mesa' : 'Ocupar Mesa'}>
          <IconButton
            size="small"
            onClick={handleToggleOccupied}
            sx={{
              backgroundColor: table.isOccupied ? '#ff9800' : '#4caf50',
              color: 'white',
              width: 30,
              height: 30,
              '&:hover': {
                backgroundColor: table.isOccupied ? '#f57c00' : '#388e3c',
              },
            }}
          >
            <Person sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}

export default DraggableTable;