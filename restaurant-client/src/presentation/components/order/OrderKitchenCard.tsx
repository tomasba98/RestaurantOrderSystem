import React from 'react';
import { Box, Card, CardContent, CardActions, Button, Chip, Typography, List, ListItem, ListItemText, Divider, Grid, } from '@mui/material';
import { Kitchen, Cancel, Timer, RestaurantMenu, LocalShipping, } from '@mui/icons-material';
import { OrderStatus } from '@/domain/entities/Order';
import type { Order } from '@/domain/entities/Order';
import { getStatusBorderColor } from '@/utils/orderUtils';

interface OrderKitchenCardProps {
  order: Order;
  onMarkReady: (orderId: string) => void;
  onMarkInKitchen: (orderId: string) => void;
  onCancel: (orderId: string) => void;
}

const OrderKitchenCard: React.FC<OrderKitchenCardProps> = ({
  order,
  onMarkReady,
  onMarkInKitchen,
  onCancel,
}) => {
  const getOrderAge = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);

    if (diffMinutes < 1) return 'Recién creada';
    if (diffMinutes === 1) return '1 minuto';
    if (diffMinutes < 60) return `${diffMinutes} minutos`;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getUrgencyColor = (createdAt: string): "default" | "warning" | "error" => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);

    if (diffMinutes < 15) return 'default';
    if (diffMinutes < 30) return 'warning';
    return 'error';
  };
  const isConfirmed = order.status === OrderStatus.Confirmed;
  const isInKitchen = order.status === OrderStatus.InKitchen;

  return (
    <Grid container key={order.id} spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }} >
        <Card
          sx={{
            height: '100%',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '4px solid',
            borderLeftColor: getStatusBorderColor(order.status),
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" component="div">
                Mesa #{order.tableNumber}
              </Typography>
              <Chip
                icon={<Timer fontSize="small" />}
                label={getOrderAge(order.createdAt)}
                color={getUrgencyColor(order.createdAt)}
                size="small"
              />
            </Box>

            <Chip
              label={isConfirmed ? 'Confirmada' : 'En Cocina'}
              color={isConfirmed ? 'info' : 'warning'}
              icon={isConfirmed ? <RestaurantMenu /> : <Kitchen />}
              size="small"
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Productos:
            </Typography>
            <List dense disablePadding>
              {order.productList.map((item) => (
                <ListItem
                  key={item.id}
                  disableGutters
                  sx={{
                    py: 0,
                    my: 0,
                    minHeight: 'unset',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                        <strong>{item.quantity}x</strong> {item.productName}
                      </Typography>
                    }
                    secondary={
                      item.description && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', ml: 4, lineHeight: 1.1 }}
                        >
                          {item.description}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>


            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Total:
              </Typography>
              <Typography variant="h6" color="primary">
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              Creada: {new Date(order.createdAt).toLocaleTimeString()}
            </Typography>
          </CardContent>

          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
              size="small"
              color="error"
              onClick={() => onCancel(order.id)}
              startIcon={<Cancel />}
            >
              Cancelar
            </Button>
            {isInKitchen && (
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => onMarkReady(order.id)}
                startIcon={<LocalShipping />}
                fullWidth
              >
                Lista
              </Button>
            )}
            {isConfirmed && (
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => onMarkInKitchen(order.id)}
                startIcon={<Kitchen />}
                fullWidth
              >
                En Cocina
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrderKitchenCard;