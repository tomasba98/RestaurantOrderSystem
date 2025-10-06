import React, { useState, useEffect } from 'react';
import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Typography,  Box,  List,  ListItem,  ListItemText,  IconButton,  Card,  CardContent,  Divider,  Chip,  Alert,  CircularProgress,} from '@mui/material';
import { Add, Remove, ShoppingCart, Close } from '@mui/icons-material';
import type { Product, OrderDetailItem, Table } from '@/types';

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  table: Table | null;
  products: Product[];
  onCreateOrder: (tableId: string, items: OrderDetailItem[]) => Promise<void>;
  loading?: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  onClose,
  table,
  products,
  onCreateOrder,
  loading = false,
}) => {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [total, setTotal] = useState(0);

  // Calculate total when items change
  useEffect(() => {
    let newTotal = 0;
    selectedItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        newTotal += product.price * quantity;
      }
    });
    setTotal(newTotal);
  }, [selectedItems, products]);

  const handleAddItem = (productId: string) => {
    setSelectedItems(prev => {
      const newItems = new Map(prev);
      const currentQuantity = newItems.get(productId) || 0;
      newItems.set(productId, currentQuantity + 1);
      return newItems;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(prev => {
      const newItems = new Map(prev);
      const currentQuantity = newItems.get(productId) || 0;
      if (currentQuantity > 1) {
        newItems.set(productId, currentQuantity - 1);
      } else {
        newItems.delete(productId);
      }
      return newItems;
    });
  };

  const handleCreateOrder = async () => {
    if (!table || selectedItems.size === 0) return;

    const items: OrderDetailItem[] = Array.from(selectedItems.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    try {
      await onCreateOrder(table.id, items);
      setSelectedItems(new Map());
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleClose = () => {
    setSelectedItems(new Map());
    onClose();
  };

  const availableProducts = products.filter(product => product.isAvailable);
  const totalItems = Array.from(selectedItems.values()).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '70vh',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            Crear Orden - Mesa {table?.number}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', gap: 3, height: '100%' }}>
          {/* Products List */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h6" gutterBottom>
              Productos Disponibles
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
              {availableProducts.map((product) => (
                <Box key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                    onClick={() => handleAddItem(product.id)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div" noWrap>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, minHeight: 40 }}
                      >
                        {product.description || 'Sin descripción'}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color="primary">
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(product.id);
                            }}
                            disabled={!selectedItems.has(product.id)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                            {selectedItems.get(product.id) || 0}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddItem(product.id);
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: 1, borderLeft: '1px solid #e0e0e0', pl: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen de Orden
            </Typography>
            
            {selectedItems.size === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Selecciona productos para crear la orden
              </Alert>
            ) : (
              <>
                <List dense>
                  {Array.from(selectedItems.entries()).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    
                    return (
                      <ListItem key={productId} sx={{ px: 0 }}>
                        <ListItemText
                          primary={product.name}
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {quantity} x ${product.price.toFixed(2)}
                            </Typography>
                          }
                        />
                        <Typography variant="body2" fontWeight="bold">
                          ${(product.price * quantity).toFixed(2)}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    icon={<ShoppingCart />}
                    label={`${totalItems} productos`}
                    size="small"
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleCreateOrder}
          variant="contained"
          disabled={selectedItems.size === 0 || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <ShoppingCart />}
        >
          {loading ? 'Creando...' : 'Crear Orden'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;