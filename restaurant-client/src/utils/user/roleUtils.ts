import { Roles } from '@/domain/entities/User';
import type { ChipProps } from '@mui/material';

export const roleLabels: Record<Roles, string> = {
  [Roles.Admin]: 'Admin',
  [Roles.Manager]: 'Manager',
  [Roles.Waiter]: 'Waiter',
  [Roles.Kitchen]: 'Kitchen',
};

export const getRoleLabel = (role: Roles): string => roleLabels[role] || 'Usuario';

export const roleColors: Record<Roles, ChipProps['color']> = {
  [Roles.Admin]: 'error',
  [Roles.Manager]: 'success',
  [Roles.Waiter]: 'info',
  [Roles.Kitchen]: 'warning',
};

export const getRoleColor = (role: Roles): ChipProps['color'] => roleColors[role] || 'default';

const avatarRoleColors: Record<Roles, string> = {
  [Roles.Admin]: 'error.main',
  [Roles.Manager]: 'success.main',
  [Roles.Waiter]: 'info.main',
  [Roles.Kitchen]: 'warning.main',
};

export const getRoleAvatarColor = (role: Roles): string =>  avatarRoleColors[role] ?? 'default.main';



/* Generic way to get role colors

export const roleBaseColors = {
  [Roles.Admin]: 'error',
  [Roles.Manager]: 'success',
  [Roles.Waiter]: 'info',
  [Roles.Kitchen]: 'warning',
} as const;


type ColorVariant = 'chip' | 'avatar' | 'text' | 'bg' | 'border';

export const getRoleColorVariant = (
  role?: Roles,
  variant: ColorVariant = 'chip'
): string => {

  const base = role ? roleBaseColors[role] : 'default';

  const variants = {
    chip: base,
    avatar: `${base}.main`,
    text: `${base}.contrastText`,
    bg: `${base}.light`,
    border: `${base}.dark`,
  };

  return variants[variant] ?? base;
};
*/