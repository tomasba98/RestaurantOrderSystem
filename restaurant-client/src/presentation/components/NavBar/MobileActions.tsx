import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onOpenDrawer: () => void;
  isAuthenticated: boolean;
}

export function MobileActions({ onOpenDrawer, isAuthenticated }: Props) {
  if (!isAuthenticated) return null;

  return (
    <IconButton 
      edge="end" 
      color="inherit" 
      onClick={onOpenDrawer}
      sx={{
        transition: 'transform 0.2s',
        '&:active': {
          transform: 'scale(0.95)',
        }
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}
