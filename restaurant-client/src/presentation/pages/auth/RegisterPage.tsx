import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Box,  Card,  CardContent,  TextField,  Button,  Typography,  Alert,  InputAdornment,  IconButton,  Container,  Avatar,  MenuItem,} from '@mui/material';
import {  Visibility,  VisibilityOff,  RestaurantMenu,  Person,  Lock,  Email,} from '@mui/icons-material';
import type { RegisterData } from '@/domain/repositories/IAuthRepository';
import { Roles } from '@/domain/entities/User';
import { useAuth } from '@/aplication/hooks/auth/useAuth';



const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterData>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: Roles.Waiter,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formErrors, setFormErrors] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    if (error) setError(null);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    };

    if (!formData.userName.trim()) {
      errors.userName = 'El nombre de usuario es requerido';
    } else if (formData.userName.length < 3) {
      errors.userName = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es requerido';
    } 
    if (!formData.lastName.trim()) {
      errors.firstName = 'El apellido es requerido';
    } 

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await register({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        confirmPassword: formData.confirmPassword
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error('Registro error completo:', error.response?.data);
      const errors = error.response?.data?.errors;
      if (errors) {
        console.error('Errores específicos de validación:', errors);
      }
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Error al crear la cuenta';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 450,
            boxShadow: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                }}
              >
                <RestaurantMenu />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom>
                Crear Cuenta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Únete a nuestro sistema de órdenes
              </Typography>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* Formulario */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                name="userName"
                label="Usuario"
                value={formData.userName}
                onChange={handleInputChange}
                error={!!formErrors.userName}
                helperText={formErrors.userName}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

               <TextField
                fullWidth
                name="firstName"
                type="firstName"
                label="Nombre"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="lastName"
                type="lastName"
                label="Apellido"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                disabled={isLoading}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
              select
              fullWidth
              name="role"
              label="Rol"
              value={formData.role}
              onChange={handleInputChange}
              error={!!formErrors.role}
              helperText={formErrors.role}
              disabled={isLoading}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            >
              {Object.keys(Roles)
                .filter(key => !isNaN(Number(key))) // Solo claves numéricas (0, 1, 2, 3)
                .map(key => (
                  <MenuItem key={key} value={Number(key)}>
                    {Roles[Number(key)]}
                  </MenuItem>
                ))}

            </TextField>      

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </Box>            
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterPage;