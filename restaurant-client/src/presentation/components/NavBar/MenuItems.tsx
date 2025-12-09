import { TableRestaurant, Receipt, Kitchen, Flatware, PeopleAlt, AccountCircle } from "@mui/icons-material";

export const menuItems = [
  { label: "Salón", path: "/hall", icon: <TableRestaurant /> },
  { label: "Órdenes", path: "/orders", icon: <Receipt /> },
  { label: "Cocina", path: "/kitchen", icon: <Kitchen /> },
  { label: "Platos", path: "/products", icon: <Flatware /> },
  { label: "Sesiones", path: "/sessions", icon: <PeopleAlt /> },
  { label: "Usuarios", path: "/users", icon: <AccountCircle /> },
];
