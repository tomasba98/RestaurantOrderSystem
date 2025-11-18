import React, { useState, useEffect } from 'react';
import {  Dialog,  DialogTitle,  DialogContent,  DialogActions,  Button,  Box,  Typography,  List,  ListItem,  ListItemText,  IconButton,  TextField,  InputAdornment,  Divider,  Alert,  CircularProgress,  Chip,  useTheme, Tabs,   Tab,  } from '@mui/material';
import {  Add,  Remove,  Delete,  ShoppingCart,  Search,} from '@mui/icons-material';
import type { Product } from '@/domain/entities/Product';
import type { OrderDetailItem } from '@/domain/repositories/IOrderRepository';
import type { Table } from '@/domain/entities/Table';
import { useMediaQuery } from '@mui/system';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); 

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


  const ProductsList = () => (
    <Box sx={{ overflowY: 'auto', height: '100%' }}>
      <TextField
        fullWidth
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size={isMobile ? 'small' : 'medium'}  
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Typography 
        variant={isMobile ? 'body2' : 'subtitle2'}  
        gutterBottom
        fontWeight="bold"
      >
        Productos Disponibles
      </Typography>

      {filteredProducts.length === 0 ? (
        <Alert severity="info">No hay productos disponibles</Alert>
      ) : (
        <List sx={{ px: 0 }}> 
          {filteredProducts.map((product) => (
            <ListItem
              key={product.id}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
                p: isMobile ? 1 : 2, 
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => addToCart(product)}
            >
              <ListItemText
                primary={
                  <Typography 
                    variant={isMobile ? 'body2' : 'body1'} 
                    fontWeight="bold"
                  >
                    {product.name}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant={isMobile ? 'caption' : 'body2'} 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box', 
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </Typography>
                }
              />
              <Box textAlign="right" sx={{ ml: 1 }}>
                <Typography 
                  variant={isMobile ? 'body1' : 'h6'}  
                  color="primary"
                  fontWeight="bold"
                >
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
                  <Add fontSize={isMobile ? 'small' : 'medium'} /> 
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );


  const CartContent = () => (
    <Box sx={{ overflowY: 'auto', height: '100%' }}>
      <Typography 
        variant={isMobile ? 'body2' : 'subtitle2'}  
        gutterBottom
        fontWeight="bold"
      >
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
          <ShoppingCart sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />  
          <Typography variant={isMobile ? 'body2' : 'body1'}>  
            El carrito está vacío
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ px: 0 }}>  
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
                  p: isMobile ? 1 : 1.5,  
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="start"
                  mb={1}
                >
                  <Typography 
                    variant={isMobile ? 'body2' : 'body1'}  
                    fontWeight="bold"
                  >
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
                  <Box display="flex" alignItems="center" gap={0.5}>  
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
                      sx={{ width: isMobile ? '50px' : '60px' }}  
                      inputProps={{ 
                        min: 1, 
                        style: { 
                          textAlign: 'center',
                          fontSize: isMobile ? '0.875rem' : '1rem' 
                        } 
                      }}
                    />
                    
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography 
                    variant={isMobile ? 'body2' : 'body1'} 
                    color="primary" 
                    fontWeight="bold"
                  >
                    ${item.subtotal.toFixed(2)}
                  </Typography>
                </Box>

                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  ${item.product.price.toFixed(2)} c/u
                </Typography>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant={isMobile ? 'body1' : 'h6'}> 
              Total:
            </Typography>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              color="primary" 
              fontWeight="bold"
            >
              ${getTotalAmount().toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
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
      <DialogTitle sx={{ pb: isMobile ? 1 : 2 }}>  
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}  
          gap={1}
        >
          <Typography variant={isMobile ? 'h6' : 'h5'}>  
            Nueva Orden - Mesa {table?.number}
          </Typography>
          <Chip
            icon={<ShoppingCart />}
            label={`${getTotalItems()} items`}
            color="primary"
            size={isMobile ? 'small' : 'medium'} 
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: isMobile ? 1 : 2 }}>  
        {error && (
          <Alert 
            severity="error" 
            onClose={() => setError(null)} 
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

       
        {isMobile ? (
          // Layout Mobile 
          <Box sx={{ height: 'calc(100vh - 200px)' }}> 
            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              <Tab label="Productos" />
              <Tab 
                label={`Carrito (${getTotalItems()})`}
                icon={cart.length > 0 ? <ShoppingCart color="primary" /> : undefined}
                iconPosition="end"
              />
            </Tabs>

            {activeTab === 0 && <ProductsList />}
            {activeTab === 1 && <CartContent />}
          </Box>
        ) : (
          // Layout Desktop 
          <Box 
            display="flex" 
            gap={2} 
            sx={{ height: isTablet ? '400px' : '500px' }}  
          >
            {/* Products List */}
            <Box flex={1}>
              <ProductsList />
            </Box>

            {/* Cart */}
            <Box
              flex={1}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
              }}
            >
              <CartContent />
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: isMobile ? 1.5 : 2 }}> 
        <Button 
          onClick={onClose} 
          disabled={loading}
          size={isMobile ? 'small' : 'medium'}  
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreateOrder}
          variant="contained"
          disabled={cart.length === 0 || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <ShoppingCart />}
          size={isMobile ? 'small' : 'medium'}  
        >
          {loading ? 'Creando...' : 'Crear Orden'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCreationCard;