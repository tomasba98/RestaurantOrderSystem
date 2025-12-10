import { useState } from 'react';
import { type User, Roles } from '@/domain/entities/User';
import type { RegisterDTO } from '@/aplication/dto/UserDTO';

export type DialogMode = 'create' | 'edit';

const INITIAL_FORM_DATA: RegisterDTO = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  role: Roles.Waiter,
};

export const useUserDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<RegisterDTO>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null); // Para errores específicos del formulario

  const handleOpenCreateDialog = () => {
    setError(null);
    setDialogMode('create');
    setFormData(INITIAL_FORM_DATA);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (user: User) => {
    setError(null);
    setDialogMode('edit');
    setSelectedUser(user);
    setFormData({
      userName: user.userName,
      email: user.email,
      password: '', 
      firstName: (user as any).firstName || '', 
      lastName: (user as any).lastName || '',
      role: user.role,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData(INITIAL_FORM_DATA);
    setError(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: Roles) => {
    setFormData(prev => ({ ...prev, role }));
  };

  return {
    openDialog,
    dialogMode,
    selectedUser,
    formData,
    error,    
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleChange,
    handleRoleChange,
    setFormError: setError,
  };
};