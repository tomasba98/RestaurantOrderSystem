import React, { useState, useEffect } from 'react';
import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Box,  Typography,  List,  ListItem,  ListItemText,  IconButton,  TextField,  InputAdornment,  Divider,  Alert,  CircularProgress,  Chip,} from '@mui/material';
import {  Add,  Remove,  Delete,  ShoppingCart,  Search,} from '@mui/icons-material';
import type { Product } from '@/domain/entities/Product';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import type { Table } from '@/domain/entities/Table';

interface OrderCreationDialogProps {
  open: boolean;
  table: Table | null;
  products: Product[];
  onClose: () => void;
  onCreateOrder: (tableId: string, items: OrderDetailItem[]) => Promise<void>;
  loading?: boolean;
}

interface CartItem extends OrderDetailItem {
  product: Product;
  subtotal: number;
}

const OrderCreationDialog: React.FC<OrderCreationDialogProps> = ({
  open,
  table,
  products,
  onClose,
  onCreateOrder,
  loading = false,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.isAvailable &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (!open) {
      setCart([]);
      setSearchTerm('');
      setError(null);
    }
  }, [open]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * product.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          quantity: 1,
          product,
          subtotal: product.price,
        },
      ];
    });
    setError(null);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.product.price,
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const getTotalAmount = (): number => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      setError('Agrega al menos un producto a la orden');
      return;
    }

    if (!table) {
      setError('Mesa no seleccionada');
      return;
    }

    try {
      const orderItems: OrderDetailItem[] = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await onCreateOrder(table.id, orderItems);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al crear la orden');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Nueva Orden - Mesa {table?.number}</Typography>
          <Chip
            icon={<ShoppingCart />}
            label={`${getTotalItems()} items`}
            color="primary"
          />
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" gap={2} sx={{ height: '500px' }}>
          {/* Products List */}
          <Box flex={1} sx={{ overflowY: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Productos Disponibles
            </Typography>

            {filteredProducts.length === 0 ? (
              <Alert severity="info">No hay productos disponibles</Alert>
            ) : (
              <List>
                {filteredProducts.map((product) => (
                  <ListItem
                    key={product.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => addToCart(product)}
                  >
                    <ListItemText
                      primary={product.name}
                      secondary={product.description}
                    />
                    <Box textAlign="right">
                      <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Cart */}
          <Box
            flex={1}
            sx={{
              overflowY: 'auto',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Carrito
            </Typography>

            {cart.length === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                color="text.secondary"
              >
                <ShoppingCart sx={{ fontSize: 60, mb: 2 }} />
                <Typography>El carrito está vacío</Typography>
              </Box>
            ) : (
              <>
                <List>
                  {cart.map((item) => (
                    <ListItem
                      key={item.productId}
                      sx={{
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                        p: 1,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="start"
                        mb={1}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {item.product.name}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          
                          <TextField
                            size="small"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value) || 0)
                            }
                            sx={{ width: '60px' }}
                            inputProps={{ min: 1, style: { textAlign: 'center' } }}
                          />
                          
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>

                        <Typography variant="body2" color="primary" fontWeight="bold">
                          ${item.subtotal.toFixed(2)}
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        ${item.product.price.toFixed(2)} c/u
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    ${getTotalAmount().toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreateOrder}
          variant="contained"
          disabled={cart.length === 0 || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <ShoppingCart />}
        >
          {loading ? 'Creando...' : 'Crear Orden'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCreationDialog;