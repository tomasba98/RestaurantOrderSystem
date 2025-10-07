import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '@/aplication/context/AuthContext';

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { isAuthenticated, user, logout } = auth;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button variant="outlined" color="primary" href="/">
            Restaurant System
        </Button>

        {isAuthenticated && user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">
              Bienvenido, <strong>{user.userName}</strong>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="primary" href="/login">
            Iniciar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
