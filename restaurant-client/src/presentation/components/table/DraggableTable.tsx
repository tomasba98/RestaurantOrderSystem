import React, { memo, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import { AddShoppingCart, TableRestaurant, Person, Delete } from "@mui/icons-material";
import type { Table } from "@/domain/entities/Table";

interface DraggableTableProps {
  table: Table;
  onCreateOrder: (table: Table) => void;
  onToggleOccupied: (tableId: string) => void;
  onDeleteTable: (tableId: string) => void;
}

function DraggableTable({ table, onCreateOrder, onToggleOccupied, onDeleteTable }: DraggableTableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: table.id });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${table.x + transform.x}px, ${table.y + transform.y}px, 0)`
      : `translate3d(${table.x}px, ${table.y}px, 0)`,
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const handleCreateOrder = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onCreateOrder(table);
  }, [onCreateOrder, table]);

  const handleToggleOccupied = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleOccupied(table.id);
  }, [onToggleOccupied, table.id]);

  const handleDeleteTable = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteTable(table.id);
  }, [onDeleteTable, table.id]);

  return (
    <div style={style}>
      <div ref={setNodeRef} {...listeners} {...attributes} style={{ width: "100%", height: "100%", cursor: "move" }}>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: table.isOccupied ? "#BF1515" : "black",
            color: "white",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TableRestaurant sx={{ fontSize: 20, mb: 0.5 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Mesa {table.number}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.7rem", opacity: 0.9 }}>
              {table.isOccupied ? "Ocupada" : "Libre"}
            </Typography>
          </Box>
        </Paper>
      </div>

      <Box
        sx={{
          position: "absolute",
          top: -15,
          right: -15,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          zIndex: 10,
        }}
      >
        <Tooltip title="Crear Orden">
          <IconButton
            size="small"
            onClick={handleCreateOrder}
            sx={{
              backgroundColor: "#2196f3",
              color: "white",
              width: 30,
              height: 30,
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            <AddShoppingCart sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={table.isOccupied ? "Liberar Mesa" : "Ocupar Mesa"}>
          <IconButton
            size="small"
            onClick={handleToggleOccupied}
            sx={{
              backgroundColor: table.isOccupied ? "#ff9800" : "#4caf50",
              color: "white",
              width: 30,
              height: 30,
              "&:hover": {
                backgroundColor: table.isOccupied ? "#f57c00" : "#388e3c",
              },
            }}
          >
            <Person sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar Mesa">
          <IconButton
            size="small"
            onClick={handleDeleteTable}
            sx={{
              backgroundColor: "red",
              color: "white",
              width: 30,
              height: 30,
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}

export default memo(DraggableTable, (prev, next) => {
  return (
    prev.table.id === next.table.id &&
    prev.table.x === next.table.x &&
    prev.table.y === next.table.y &&
    prev.table.isOccupied === next.table.isOccupied &&
    prev.table.number === next.table.number
  );
});
