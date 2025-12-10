import React, { useState, useEffect } from 'react';
import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Box,  Typography,  IconButton,  TextField,  InputAdornment,  CircularProgress,  useTheme,  Tabs,  Tab,  Paper,  Card,  CardContent,  Stack,  alpha} from '@mui/material';
import {  Add,  Remove,  Delete,  ShoppingCart,  Search,  Close,  Receipt} from '@mui/icons-material';
import { useMediaQuery } from '@mui/system';
import type { Product } from '@/domain/entities/Product';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import type { Table } from '@/domain/entities/Table';

interface OrderCreationCardProps {
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

const OrderCreationCard: React.FC<OrderCreationCardProps> = ({
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
  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      setActiveTab(0);
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
    if (cart.length === 0) return;
    if (!table) return;

    try {
      const orderItems: OrderDetailItem[] = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await onCreateOrder(table.id, orderItems);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  const scrollbarSx = {
    '&::-webkit-scrollbar': { width: 6 },
    '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: theme.palette.divider,
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      bgcolor: theme.palette.action.active,
    },
  };

  const ProductsList = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, ...scrollbarSx }}>
        <Stack spacing={1.5}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              variant="outlined"
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <CardContent sx={{ p: '12px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ overflow: 'hidden', mr: 2 }}>
                  <Typography variant="subtitle2" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => addToCart(product)}
                  sx={{ 
                    border: 1, 
                    borderColor: 'divider',
                    '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText', borderColor: 'primary.main' } 
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );

  const CartContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Typography variant="subtitle1" fontWeight="600" display="flex" alignItems="center" gap={1}>
          <ShoppingCart fontSize="small" color="primary" /> Current Order
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, ...scrollbarSx }}>
        {cart.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="text.secondary">
            <Receipt sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">Cart is empty</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {cart.map((item) => (
              <Paper
                key={item.productId}
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider'
                }}
              >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" fontWeight="500">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    ${item.subtotal.toFixed(2)}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    ${item.product.price} ea
                  </Typography>
                  
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    sx={{ 
                      bgcolor: 'action.hover', 
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      sx={{ p: 0.5 }}
                    >
                      {item.quantity === 1 ? <Delete fontSize="inherit" color="error" /> : <Remove fontSize="inherit" />}
                    </IconButton>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      sx={{ minWidth: 24, textAlign: 'center', mx: 0.5 }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      sx={{ p: 0.5 }}
                    >
                      <Add fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          bgcolor: 'background.paper', 
          borderTop: 1, 
          borderColor: 'divider'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="text.secondary">Total</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            ${getTotalAmount().toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        p: 2
      }}>
        <Typography variant="h6" component="div">
          New Order <Typography component="span" color="text.secondary" variant="body1">- Table {table?.number}</Typography>
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: 'hidden', height: isMobile ? '100%' : '600px' }}>
        {isMobile ? (
          <Box display="flex" flexDirection="column" height="100%">
            <Tabs 
              value={activeTab} 
              onChange={(_, v) => setActiveTab(v)} 
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 48 }}
            >
              <Tab label="Menu" />
              <Tab label={`Cart (${getTotalItems()})`} />
            </Tabs>
            <Box flex={1} overflow="hidden">
              {activeTab === 0 ? <ProductsList /> : <CartContent />}
            </Box>
          </Box>
        ) : (
          <Box display="flex" height="100%">
            <Box flex={1.3} borderRight={1} borderColor="divider">
              <ProductsList />
            </Box>
            <Box flex={1}>
              <CartContent />
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleCreateOrder}
          variant="contained"
          disabled={cart.length === 0 || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Processing' : 'Create Order'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCreationCard;