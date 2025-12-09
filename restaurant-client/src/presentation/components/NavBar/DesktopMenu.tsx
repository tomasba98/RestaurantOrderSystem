import { Box } from "@mui/material";
import { NavItem } from "./NavItem";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "./MenuItems";

export function DesktopMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box display="flex" gap={1} flexGrow={1}>
      {menuItems.map((item) => (
        <NavItem
          key={item.path}
          label={item.label}
          icon={item.icon}
          selected={pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}
    </Box>
  );
}
