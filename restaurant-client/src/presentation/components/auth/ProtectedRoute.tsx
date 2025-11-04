import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Roles } from '@/domain/entities/User';
import { useAuth } from '@/aplication/hooks/auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: number[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="body1" color="text.secondary">
          Verificando autenticación...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    console.log(`[ProtectedRoute] Redirigiendo a /login desde ${location.pathname}: No autenticado.`);
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  let isRoleAuthorized = true;
  if (requiredRoles && requiredRoles.length > 0) {
    isRoleAuthorized = requiredRoles.includes(user?.role ?? -1);
  }

  //Debug for roles
  // console.log('🔐 ProtectedRoute Debug:', {
  //   path: location.pathname,
  //   isAuthenticated,
  //   userRole: user?.role,
  //   requiredRoles,
  //   isRoleAuthorized,
  // });

  if (!isRoleAuthorized) {
    console.warn(`[ProtectedRoute] Acceso Denegado por Rol. Redirigiendo a /: Roles Requeridos ${requiredRoles}, Rol Usuario ${user?.role}.`);
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Acceso Denegado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No tienes permisos para acceder a esta página.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Se requiere uno de los roles:{" "}
          <strong>
            {requiredRoles!.map((r) => Roles[r]).join(', ')}
          </strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tu rol actual: <strong>{Roles[user?.role!]}</strong>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
