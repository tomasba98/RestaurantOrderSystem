import { Box, IconButton, Button, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { UserInfo } from "./UserInfo";
import { useTheme } from "@mui/material/styles";

interface Props {
  user: any;
  onLogout: () => void;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
}

export function DesktopActions({ user, onLogout, mode, toggleTheme, isAuthenticated, onNavigate }: Props) {
  const theme = useTheme();

  if (isAuthenticated && user) {
    return (
      <Box display="flex" alignItems="center" gap={1.5}>
        <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        <UserInfo user={user} />
        <Tooltip title="Cerrar sesión">
          <IconButton 
            onClick={onLogout} 
            color="inherit"
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
                transform: 'scale(1.05)',
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
        <IconButton 
          onClick={toggleTheme} 
          color="inherit"
          sx={{
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onNavigate('/login')}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          px: 2.5,
          borderRadius: 2,
          boxShadow: 2,
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-1px)',
          }
        }}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
}
