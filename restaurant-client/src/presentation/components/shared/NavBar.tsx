import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { TableRestaurant,Flatware, Receipt, Kitchen, Home } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/aplication/context/AuthContext';
import { useRoleCheck } from '@/aplication/hooks/auth/useRoleCheck';

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const roleCheck = useRoleCheck();

  if (!auth) return null;

  const { isAuthenticated, user, logout } = auth;
  //onst { canTakeOrders, canViewKitchen } = roleCheck;

  useEffect(() => {
    console.log(isAuthenticated);
  })
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        
        {/* Logo/Home */}
        <IconButton
          edge="start"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <Home />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            mr: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/')}
        >
          Restaurant System
        </Typography>

        {/* Navigation Links - Solo si está autenticado */}
        {isAuthenticated && (
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>    

          {/*Recordatorio: A futuro agregar vistas condicionales en cuanto a permisos. Ej: canTakeOrders, canViewKitchen  */}

            <Button
              startIcon={<TableRestaurant />}
              onClick={() => navigate('/hall')}
              variant={isActive('/hall') ? 'contained' : 'text'}
              color={isActive('/hall') ? 'primary' : 'inherit'}
            >
             Salon
            </Button>
            <Button
              startIcon={<Receipt />}
              onClick={() => navigate('/orders')}
              variant={isActive('/orders') ? 'contained' : 'text'}
              color={isActive('/orders') ? 'primary' : 'inherit'}
            >
              Órdenes
            </Button>            
            <Button
              startIcon={<Kitchen />}
              onClick={() => navigate('/kitchen')}
              variant={isActive('/kitchen') ? 'contained' : 'text'}
              color={isActive('/kitchen') ? 'primary' : 'inherit'}
            >
              Cocina
            </Button>
            <Button
              startIcon={<Flatware  />}
              onClick={() => navigate('/products')}
              variant={isActive('/products') ? 'contained' : 'text'}
              color={isActive('/products') ? 'primary' : 'inherit'}
            >
              Platos
            </Button>
          </Box>
        )}

        {/* User Info & Logout */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated && user ? (
            <>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {user.userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {['Admin', 'Manager', 'Waiter', 'Kitchen'][user.role]}
                </Typography>
              </Box>
              <Button variant="outlined" color="primary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;