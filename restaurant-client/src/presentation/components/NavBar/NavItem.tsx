import { Button } from "@mui/material";
import type { ReactNode } from "react";

export interface NavItemProps {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function NavItem({ label, icon, selected, onClick }: NavItemProps) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      disableRipple
      sx={(theme) => ({
        position: "relative",
        textTransform: "none",
        fontWeight: selected ? 600 : 500,
        color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
        px: 2.2,
        py: 1.2,
        borderRadius: 2,
        transition: theme.transitions.create(["color", "background-color", "transform"], {
          duration: 200,
          easing: theme.transitions.easing.easeInOut,
        }),

        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          right: "50%",
          bottom: 4,
          height: "3px",
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2,
          transform: selected ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          transition: theme.transitions.create(["transform", "left", "right"], {
            duration: 300,
            easing: theme.transitions.easing.easeOut,
          }),
          width: selected ? "80%" : "0%",
        },

        "&:hover": {
          backgroundColor: selected 
            ? theme.palette.primary.main + "08"
            : theme.palette.mode === "light"
              ? theme.palette.action.hover
              : "rgba(255,255,255,0.08)",
          transform: "translateY(-1px)",
          color: theme.palette.primary.main,

          "&::after": {
            transform: "translateX(-50%) scaleX(1)",
            width: "80%",
          },
        },

        "&:active": {
          transform: "translateY(0px)",
        },
      })}
    >
      {label}
    </Button>
  );
}
