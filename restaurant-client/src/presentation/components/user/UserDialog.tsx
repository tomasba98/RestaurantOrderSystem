// UserDialog.tsx

import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, FormControl, InputLabel, Select, MenuItem, Alert,
  InputAdornment, IconButton, Divider, Typography
} from '@mui/material';
import { 
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  AccountCircle as AccountCircleIcon,
  Work as WorkIcon
} from '@mui/icons-material';

import { Roles } from '@/domain/entities/User';
import type { CreateUserData } from '@/domain/repositories/IUserRepository';
import type { DialogMode } from '@/aplication/hooks/user/useUserDialog';
import { roleLabels } from '@/utils/user/roleUtils';
import { Grid } from '@mui/system';

interface UserDialogProps {
  open: boolean;
  mode: DialogMode;
  formData: CreateUserData;
  formError: string | null;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRoleChange: (role: Roles) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ 
  open, 
  mode, 
  formData, 
  formError, 
  onClose, 
  onSubmit,
  onChange,
  onRoleChange,
}) => {
  
  const isCreate = mode === 'create';
  
  const roleOptions = Object.values(Roles)
    .filter((value) => typeof value === 'number') as Roles[];

  const isSubmitDisabled = !formData.userName || !formData.email || (isCreate && (!formData.password || formData.password.length < 6));

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {isCreate ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {formError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {formError}
          </Alert>
        )}

        {/* Grid Container Principal */}
        <Grid container spacing={3}>
          
          {/* Sección Datos de Cuenta */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
              Datos de la Cuenta
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nombre de usuario"
              fullWidth
              required
              name="userName"
              value={formData.userName}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={formData.role}
                label="Rol"
                onChange={(e) => onRoleChange(e.target.value as Roles)}
                startAdornment={
                  <InputAdornment position="start" sx={{ pl: 1 }}>
                    <WorkIcon color="action" />
                  </InputAdornment>
                }
              >
                {roleOptions.map((roleKey) => (
                  <MenuItem key={roleKey} value={roleKey}>
                    {roleLabels[roleKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              name="email"
              value={formData.email}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label={isCreate ? 'Contraseña' : 'Nueva contraseña'}
              placeholder={!isCreate ? 'Dejar vacío para mantener actual' : ''}
              type="password"
              fullWidth
              required={isCreate}
              name="password"
              value={formData.password}
              onChange={onChange}
              helperText={isCreate ? 'Mínimo 6 caracteres' : 'Dejar vacío para no cambiar'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Sección Información Personal */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
              Información Personal
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nombre"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Apellido"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={isSubmitDisabled}
          disableElevation
          sx={{ px: 4 }}
        >
          {isCreate ? 'Crear Usuario' : 'Guardar Cambios'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;