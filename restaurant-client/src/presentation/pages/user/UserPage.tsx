
import { useEffect, useMemo, useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, IconButton, TextField, 
  Alert, CircularProgress, InputAdornment
} from '@mui/material';
import { Add, Search, Refresh } from '@mui/icons-material';
import { useUserDialog } from '@/aplication/hooks/user/useUserDialog';
import { type User, Roles } from '@/domain/entities/User';
import type { CreateUserData, UpdateUserData } from '@/domain/repositories/IUserRepository';
import { useUsers } from '@/aplication/hooks/user/useUser';
import UserGrid from '@/presentation/components/user/UserGrid';
import UserDialog from '@/presentation/components/user/UserDialog';
import DeleteDialog from '@/presentation/components/user/DeleteDialog';


const UsersPage: React.FC = () => {
  const {
    users,
    isLoading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError,
    searchUsers,
    getRoleCount,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    openDialog,
    dialogMode,
    selectedUser,
    formData,
    error: formError,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleChange,
    handleRoleChange,
    setFormError,
  } = useUserDialog();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    return searchUsers(searchTerm);
  }, [searchTerm, users, searchUsers]);
  
  const handleSubmit = async () => {
    try {
      if (dialogMode === 'create') {
        if (!formData.password || formData.password.length < 6) {
          setFormError('La contraseña debe tener al menos 6 caracteres');
          return;
        }
        await createUser(formData as CreateUserData);
      } else if (selectedUser) {
        const updateData: UpdateUserData = {
          userName: formData.userName,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        };
        
        if (formData.password && formData.password.length >= 6) {
          (updateData as any).password = formData.password;
        }
        await updateUser(selectedUser.id, updateData);
      }
      handleCloseDialog();
      loadUsers(); 
    } catch (err) {
      console.error('Error saving user:', err);
      // Aquí se podría establecer un error de formulario si la API lo devuelve
    }
  };

  const handleOpenDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        handleCloseDeleteDialog();
        loadUsers(); 
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>Gestión de Usuarios</Typography>
          <Typography variant="body2" color="text.secondary">
            {users.length} usuarios totales • 
            {getRoleCount(Roles.Admin)} Admin • 
            {getRoleCount(Roles.Manager)} Manager • 
            {getRoleCount(Roles.Waiter)} Waiter • 
            {getRoleCount(Roles.Kitchen)} Kitchen
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreateDialog}>
            Nuevo Usuario
          </Button>
          <IconButton onClick={loadUsers}><Refresh /></IconButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Buscar usuarios por nombre o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
      />

      {/* Users Grid */}
      <Grid container spacing={2}>
        <UserGrid 
          filteredUsers={filteredUsers} 
          onEdit={handleOpenEditDialog} 
          onDelete={handleOpenDeleteDialog} 
        />
      </Grid>

      {/* Create/Edit Dialog */}
      <UserDialog 
        open={openDialog}
        mode={dialogMode}
        formData={formData}
        formError={formError}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onRoleChange={handleRoleChange}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        userToDelete={userToDelete}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default UsersPage;