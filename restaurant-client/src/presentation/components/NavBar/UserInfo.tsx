import { getRoleAvatarColor } from "@/utils/user/roleUtils";
import { Avatar, Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  user: any;
}

const roleLabels = ['Admin', 'Manager', 'Waiter', 'Kitchen'];

export function UserInfo({ user }: Props) {
  const theme = useTheme();
  
  if (!user) return null;

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      gap={1.5}
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        }
      }}
    >
      <Avatar 
        sx={{ 
          width: 36, 
          height: 36,
          bgcolor: getRoleAvatarColor(user.role),
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {user.userName?.[0]?.toUpperCase()}
      </Avatar>
      <Box>
        <Typography 
          variant="body2" 
          fontWeight={600}
          sx={{ lineHeight: 1.2 }}
        >
          {user.userName}
        </Typography>
        <Chip 
          label={roleLabels[user.role] || 'Usuario'} 
          size="small"
          sx={{ 
            height: 18,
            fontSize: '0.65rem',
            mt: 0.25,
          }}
        />
      </Box>
    </Box>
  );
}
