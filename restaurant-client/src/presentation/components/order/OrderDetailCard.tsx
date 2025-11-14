import {    Dialog,    DialogTitle,    DialogContent,    DialogActions,    Chip,    Typography,    List,    ListItem,    ListItemText,    Divider,    Box,  IconButton, Select, MenuItem  } from "@mui/material";
import {  Close } from "@mui/icons-material";
import  { type Order, OrderStatus } from "@/domain/entities/Order";
  
  interface Props {
    open: boolean;
    order: Order | null;
    onClose: () => void;
    onCancelOrder: (orderId: string) => void;
    onStatusChange: (orderId: string, status: OrderStatus) => void;
    getStatusIcon: (status: OrderStatus) => React.ReactElement | undefined;
    getStatusLabel: (status: OrderStatus) => string;
    getStatusChipColor: (status: OrderStatus) =>   "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"

  }
  
  export default function OrderDetailCard({
    open,
    order,
    onClose,
    onStatusChange,
    getStatusIcon,
    getStatusLabel,
    getStatusChipColor
  }: Props) {  

    const statusValues = Object.values(OrderStatus).filter(
      (value) => typeof value === "number"
    ) as OrderStatus[];
    

    if (!order) return null;
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Orden - Mesa #{order.tableNumber}
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Chip
              icon={getStatusIcon(order.status)}
              label={getStatusLabel(order.status)}
              color={getStatusChipColor(order.status)}
            />
          </Box>
  
          <Typography variant="subtitle2" gutterBottom>
            Productos:
          </Typography>
  
          <List dense>
            {order.productList.map((item) => (
              <ListItem key={item.productId}>
                <ListItemText
                  primary={`Producto: ${item.productName}`}
                  secondary={`Cantidad: ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
  
          <Divider sx={{ my: 2 }} />
  
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="primary">
              ${order.totalAmount.toFixed(2)}
            </Typography>
          </Box>
  
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={2}
          >
            Creada: {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </DialogContent>
  
        <DialogActions>       
          <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>Cambiar Estado:</Typography>
          <Select
            value={order.status}
            onChange={(e) =>
              onStatusChange(order.id, Number(e.target.value) as OrderStatus)
            }
            variant="standard"   
            disableUnderline     
            sx={{
              width: "auto",
              flexShrink: 0,
              "& .MuiSelect-select": {
                p: 0,   
                display: "flex",
                alignItems: "center",
              }
            }}
          >
            {statusValues.map((status) => (
              <MenuItem key={status} value={status} sx={{ py: 0.5 }}>
                <Chip
                  icon={getStatusIcon(status)}
                  label={getStatusLabel(status)}
                  color={getStatusChipColor(status)}
                  size="medium"
                  sx={{ width: "100%" }}
                />
              </MenuItem>
            ))}
          </Select>      
        </DialogActions>
      </Dialog>
    );
  }
  