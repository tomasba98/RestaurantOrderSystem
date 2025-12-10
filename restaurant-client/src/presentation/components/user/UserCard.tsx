// UserCard.tsx

import React from 'react';
import { Card, CardContent, Box, Typography, Chip, IconButton, Avatar, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import type { User } from '@/domain/entities/User';
import { getRoleColor, getRoleLabel } from '@/utils/user/roleUtils';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const roleColor = getRoleColor(user.role);
  const roleLabel = getRoleLabel(user.role);
  const displayDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <Card
      sx={{
        borderLeft: '4px solid',
        borderLeftColor: `${roleColor}.main`,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: `${roleColor}.main`, fontWeight: 700 }}>
            {user.userName[0].toUpperCase()}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {user.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip
            label={roleLabel}
            color={roleColor}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Typography variant="caption" color="text.secondary">
            Creado: {displayDate}
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ p: 1, display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
        <IconButton size="small" onClick={() => onEdit(user)}>
          <Edit />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(user)}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

export default UserCard;