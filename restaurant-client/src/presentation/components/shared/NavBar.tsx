import React, { useContext, useState } from 'react';
import {  AppBar,  Toolbar,  Typography,  Button,  Box,  IconButton,  Drawer,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Divider,  useTheme,  useMediaQuery,  Tooltip,} from '@mui/material';
import {  TableRestaurant,  Receipt,  Kitchen,  Home,  Flatware,  PeopleAlt,  Menu as MenuIcon,  Close as CloseIcon,  Logout,  Brightness4,  Brightness7,} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/aplication/context/AuthContext';
import { ThemeContext } from '@/aplication/context/ThemeContext';
import { useRoleCheck } from '@/aplication/hooks/auth/useRoleCheck';

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  //const roleCheck = useRoleCheck();

  if (!auth) return null;

  const { isAuthenticated, user, logout } = auth;
  const { mode, toggleTheme } = themeContext || { mode: 'light', toggleTheme: () => {} };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setDrawerOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { path: '/hall', label: 'Salón', icon: <TableRestaurant /> },
    { path: '/orders', label: 'Órdenes', icon: <Receipt /> },
    { path: '/kitchen', label: 'Cocina', icon: <Kitchen /> },
    { path: '/products', label: 'Platos', icon: <Flatware /> },
    { path: '/sessions', label: 'Sesiones', icon: <PeopleAlt /> },
  ];

  const roleLabels = ['Admin', 'Manager', 'Waiter', 'Kitchen'];

  // Drawer for mobile
  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Comanda<span style={{ color: '#785F60' }}>Go</span>
        </Typography>
        <IconButton onClick={() => toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {isAuthenticated && user && (
        <>
          <Box sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {user.userName}
            </Typography>
            <Typography variant="caption">
              {roleLabels[user.role]}
            </Typography>
          </Box>
          <Divider />
        </>
      )}

      <List>
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/')}>
                <ListItemIcon>
                  <Home color={isActive('/') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>

            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={isActive(item.path)}
                >
                  <ListItemIcon>
                    {React.cloneElement(item.icon, {
                      color: isActive(item.path) ? 'primary' : 'inherit',
                    })}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            <ListItem disablePadding>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/login')}>
                <ListItemText primary="Iniciar sesión" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {/* Menu hamburger mobile */}
          {isMobile && isAuthenticated && (
            <IconButton
              edge="start"
              color="primary"
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Home */}
          {!isMobile && (
            <IconButton
              edge="start"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <Home />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            component="div"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              mr: isMobile ? 0 : 4,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: isMobile ? '1.5rem' : '2rem',
            }}
            onClick={() => navigate('/')}
          >
            Comanda
            <Typography
              component="span"
              sx={{ color: '#785F60', fontSize: isMobile ? '1.5rem' : '2rem' }}
            >
              Go
            </Typography>
          </Typography>


          {/* Navigation Links - Desktop */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  variant={isActive(item.path) ? 'contained' : 'text'}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* User Info & Logout - Desktop*/}
          {!isMobile && (
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
              {isAuthenticated && user ? (
                <>
                  <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                    <IconButton onClick={toggleTheme} color="inherit">
                      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {user.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {roleLabels[user.role]}
                    </Typography>
                  </Box>
                  <Button variant="outlined" color="primary" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                    <IconButton onClick={toggleTheme} color="inherit">
                      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar sesión
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile */}
          {isMobile && !isAuthenticated && (
            <>
              <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;