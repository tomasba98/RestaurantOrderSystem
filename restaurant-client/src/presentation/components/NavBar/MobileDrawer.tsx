import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography, 
  IconButton,
  Avatar,
  Chip
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Close as CloseIcon, Logout, Brightness4, Brightness7 } from "@mui/icons-material";
import { menuItems } from "./MenuItems";
import { useTheme } from "@mui/material/styles";
  
interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
  isAuthenticated: boolean;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const roleLabels = ['Admin', 'Manager', 'Waiter', 'Kitchen'];
  
export function MobileDrawer({ open, onClose, user, onLogout, isAuthenticated, mode, toggleTheme }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  
  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          backgroundImage: 'none',
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Comanda<span style={{ color: theme.palette.primary.main }}>Go</span>
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{
              transition: 'transform 0.2s',
              '&:active': {
                transform: 'rotate(90deg)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* User Info */}
        {isAuthenticated && user && (
          <>
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48,
                  bgcolor: theme.palette.primary.contrastText,
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                }}
              >
                {user.userName?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {user.userName}
                </Typography>
                <Chip 
                  label={roleLabels[user.role] || 'Usuario'} 
                  size="small"
                  sx={{ 
                    height: 20,
                    fontSize: '0.7rem',
                    mt: 0.5,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'inherit',
                  }}
                />
              </Box>
            </Box>
            <Divider />
          </>
        )}

        {/* Navigation */}
        <List sx={{ flexGrow: 1, pt: 1 }}>
          {isAuthenticated ? (
            <>
              <ListItemButton
                selected={pathname === '/'}
                onClick={() => handleNavigate('/')}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main + '15',
                    '&:hover': {
                      bgcolor: theme.palette.primary.main + '25',
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <Home color={pathname === '/' ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText 
                  primary="Inicio"
                  primaryTypographyProps={{
                    fontWeight: pathname === '/' ? 600 : 400,
                  }}
                />
              </ListItemButton>

              {menuItems.map((item) => (
                <ListItemButton
                  key={item.path}
                  selected={pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    transition: 'all 0.2s',
                    '&.Mui-selected': {
                      bgcolor: theme.palette.primary.main + '15',
                      '&:hover': {
                        bgcolor: theme.palette.primary.main + '25',
                      }
                    },
                    '&:hover': {
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: pathname === item.path ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              ))}

              <Divider sx={{ my: 1 }} />

              <ListItemButton 
                onClick={toggleTheme}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'} />
              </ListItemButton>

              <ListItemButton 
                onClick={onLogout}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  color: theme.palette.error.main,
                  '&:hover': {
                    bgcolor: theme.palette.error.main + '15',
                  }
                }}
              >
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton 
                onClick={toggleTheme}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'} />
              </ListItemButton>
              <ListItemButton 
                onClick={() => handleNavigate('/login')}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  }
                }}
              >
                <ListItemText 
                  primary="Iniciar sesión"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
  