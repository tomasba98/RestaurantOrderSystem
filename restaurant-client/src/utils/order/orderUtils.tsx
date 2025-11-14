import { OrderStatus } from '@/domain/entities/Order';
import { Cancel, CheckCircle, Kitchen, Restaurant, LocalShipping, Receipt, } from '@mui/icons-material';
export const getStatusChipColor = (
  status: OrderStatus
): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
  switch (status) {
    case OrderStatus.Confirmed:
      return 'info';
    case OrderStatus.InKitchen:
      return 'warning';
    case OrderStatus.Ready:
      return 'success';
    case OrderStatus.Served:
      return 'primary';
    case OrderStatus.Paid:
      return 'secondary';
    case OrderStatus.Canceled:
      return 'error';
    default:
      return 'default';
  }
};

export const getStatusBorderColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.Confirmed:
      return 'info.main';
    case OrderStatus.InKitchen:
      return 'warning.main';
    case OrderStatus.Ready:
      return 'success.main';
    case OrderStatus.Served:
      return 'primary.main';
    case OrderStatus.Paid:
      return 'secondary.main';
    case OrderStatus.Canceled:
      return 'error.main';
    default:
      return 'transparent';
  }
};

export const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Confirmed:
        return <Receipt fontSize="small" />;
      case OrderStatus.InKitchen:
        return <Kitchen fontSize="small" />;
      case OrderStatus.Ready:
        return <LocalShipping fontSize="small" />;
      case OrderStatus.Served:
        return <Restaurant fontSize="small" />;
      case OrderStatus.Paid:
        return <CheckCircle fontSize="small" />;
      case OrderStatus.Canceled:
        return <Cancel fontSize="small" />;
      default:
        return undefined;
    }
  };

export const getStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.Confirmed]: 'Confirmada',
    [OrderStatus.InKitchen]: 'En Cocina',
    [OrderStatus.Ready]: 'Lista',
    [OrderStatus.Served]: 'Servida',
    [OrderStatus.Paid]: 'Pagada',
    [OrderStatus.Canceled]: 'Cancelada',
  };
  return labels[status];
};