import React from 'react';
import { Box } from '@mui/material';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import DraggableTable from './DraggableTable';
import type { HallProps } from '@/types';


const Hall: React.FC<HallProps> = ({ width = 800, height = 600, tables, setTables }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { delta, active } = event;
    setTables((prev) =>
      prev.map((table) =>
        table.id === active.id
          ? {
              ...table,
              x: table.x + delta.x,
              y: table.y + delta.y,
            }
          : table
      )
    );
  };

  return (
    <Box
      sx={{
        width,
        height,
        backgroundColor: '#F5F5DC',
        border: '2px solid #DCDCDC',
        borderRadius: 4,
        position: 'relative',
      }}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {tables.map((table) => (
          <DraggableTable 
            key={table.id} 
            id={table.id} 
            x={table.x} 
            y={table.y} />
        ))}
      </DndContext>
    </Box>
  );
};

export default Hall;

