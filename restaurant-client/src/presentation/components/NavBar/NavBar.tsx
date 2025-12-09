import { AppBar, Toolbar, useMediaQuery, useTheme, Box } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/aplication/context/AuthContext";
import { ThemeContext } from "@/aplication/context/ThemeContext";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { DesktopActions } from "./DesktopActions";
import { MobileActions } from "./MobileActions";
import { MobileDrawer } from "./MobileDrawer";

export function NavBar() {
  const auth = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  if (!auth) return null;

  const { isAuthenticated, user, logout } = auth;
  const { mode, toggleTheme } = themeContext || { mode: 'light', toggleTheme: () => {} };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar 
          sx={{ 
            gap: 2,
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Logo />

          {!isMobile && isAuthenticated && <DesktopMenu />}
          {!isMobile && (
            <Box sx={{ ml: 'auto' }}>
              <DesktopActions 
                user={user} 
                onLogout={handleLogout}
                mode={mode}
                toggleTheme={toggleTheme}
                isAuthenticated={isAuthenticated}
                onNavigate={navigate}
              />
            </Box>
          )}

          {isMobile && <Box flexGrow={1} />}

          {isMobile && (
            <MobileActions 
              onOpenDrawer={() => setOpenDrawer(true)}
              isAuthenticated={isAuthenticated}
            />
          )}
        </Toolbar>
      </AppBar>

      <MobileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        user={user}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        mode={mode}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
