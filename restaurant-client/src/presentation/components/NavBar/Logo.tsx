import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export function Logo() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      onClick={() => navigate("/")}
      sx={{
        cursor: "pointer",
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        }
      }}
    >
      <Typography
        variant="h4"
        sx={{ 
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}
      >
        Comanda<span style={{ color: theme.palette.primary.main }}>Go</span>
      </Typography>
    </Box>
  );
}
