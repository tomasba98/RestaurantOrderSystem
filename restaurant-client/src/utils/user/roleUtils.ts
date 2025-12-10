import { Roles } from '@/domain/entities/User';
import type { ChipProps } from '@mui/material';

export const roleLabels: Record<Roles, string> = {
  [Roles.Admin]: 'Admin',
  [Roles.Manager]: 'Manager',
  [Roles.Waiter]: 'Waiter',
  [Roles.Kitchen]: 'Kitchen',
};

export const roleColors: Record<Roles, ChipProps['color']> = {
  [Roles.Admin]: 'error',
  [Roles.Manager]: 'primary',
  [Roles.Waiter]: 'info',
  [Roles.Kitchen]: 'warning',
};

export const getRoleLabel = (role: Roles): string => roleLabels[role] || 'Usuario';

export const getRoleColor = (role: Roles): ChipProps['color'] => roleColors[role] || 'default';