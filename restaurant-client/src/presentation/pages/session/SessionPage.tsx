import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Refresh,
  TableRestaurant,
  CheckCircle,
  AccessTime,
  Close,
  Info,
} from '@mui/icons-material';
import { useSession } from '@/aplication/hooks/session/useSession';
import { useTables } from '@/aplication/hooks/table/useTables';
import type { TableSession } from '@/domain/entities/Session';

const SessionsPage: React.FC = () => {
  const {
    sessions,
    isLoading,
    error,
    loadSessions,
    endSession,
    clearError,
    getActiveSessions,
    getSessionStats,
  } = useSession();

  const { tables } = useTables();

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedSession, setSelectedSession] = useState<TableSession | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [endDialogOpen, setEndDialogOpen] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleRefresh = () => {
    loadSessions();
  };

  const handleSessionClick = (session: TableSession) => {
    setSelectedSession(session);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSession(null);
  };

  const handleOpenEndDialog = (session: TableSession) => {
    setSelectedSession(session);
    setEndDialogOpen(true);
  };

  const handleCloseEndDialog = () => {
    setEndDialogOpen(false);
    setSelectedSession(null);
  };

  const handleEndSession = async () => {
    if (selectedSession) {
      try {
        await endSession(selectedSession.id);
        handleCloseEndDialog();
        loadSessions(); 
      } catch (err) {
        console.error('Error ending session:', err);
      }
    }
  };

  const getTableNumber = (tableId: string): number | string => {
    const table = tables.find(t => t.id === tableId);
    return table?.number || tableId.slice(-4);
  };

  const getSessionDuration = (session: TableSession): string => {
    const start = new Date(session.createdAt);
    const end = session.endTime ? new Date(session.endTime) : new Date();
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);
    
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const filterSessionsByTab = () => {
    switch (currentTab) {
      case 0: // Todas
        return sessions;
      case 1: // Activas
        return getActiveSessions();
      case 2: // Completadas
        return sessions.filter(s => !s.isActive && s.endTime);
      default:
        return sessions;
    }
  };

  const stats = getSessionStats();
  const filteredSessions = filterSessionsByTab();

  if (isLoading && sessions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Sesiones
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.active} activas • {stats.completed} completadas
            {/*stats.averageDuration && ` • Duración promedio: ${stats.averageDuration} min`*/}
          </Typography>
        </Box>
        <IconButton onClick={handleRefresh} disabled={isLoading}>
          <Refresh />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Total Sesiones
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sesiones Activas
              </Typography>
              <Typography variant="h4">{stats.active}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sesiones Completadas
              </Typography>
              <Typography variant="h4">{stats.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Todas" />
          <Tab label="Activas" />
          <Tab label="Completadas" />
        </Tabs>
      </Box>

      {/* Sessions Grid */}
      <Grid container spacing={2}>
        {filteredSessions.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="info">No hay sesiones en esta categoría</Alert>
          </Grid>
        ) : (
          filteredSessions.map((session) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={session.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  border: session.isActive ? '2px solid #4caf50' : 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleSessionClick(session)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TableRestaurant />
                      <Typography variant="h6" component="div">
                        Mesa {getTableNumber(session.tableId)}
                      </Typography>
                    </Box>
                    <Chip
                      label={session.isActive ? 'Activa' : 'Completada'}
                      color={session.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Duración: {getSessionDuration(session)}
                    </Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary" display="block">
                    Inicio: {new Date(session.createdAt).toLocaleString()}
                  </Typography>
                  
                  {session.endTime && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Fin: {new Date(session.endTime).toLocaleString()}
                    </Typography>
                  )}

                  {session.isActive && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEndDialog(session);
                      }}
                      startIcon={<Close />}
                    >
                      Finalizar Sesión
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Session Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedSession && (
          <>
            <DialogTitle>
              Detalles de Sesión - Mesa {getTableNumber(selectedSession.tableId)}
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Estado"
                    secondary={
                      <Chip
                        label={selectedSession.isActive ? 'Activa' : 'Completada'}
                        color={selectedSession.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                <Divider />
                
                <ListItem>
                  <ListItemText
                    primary="ID de Sesión"
                    secondary={selectedSession.id}
                  />
                </ListItem>
                <Divider />
                
                <ListItem>
                  <ListItemText
                    primary="ID de Mesa"
                    secondary={selectedSession.tableId}
                  />
                </ListItem>
                <Divider />
                
                <ListItem>
                  <ListItemText
                    primary="Duración"
                    secondary={getSessionDuration(selectedSession)}
                  />
                </ListItem>
                <Divider />
                
                <ListItem>
                  <ListItemText
                    primary="Fecha de Inicio"
                    secondary={new Date(selectedSession.createdAt).toLocaleString()}
                  />
                </ListItem>
                
                {selectedSession.endTime && (
                  <>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Fecha de Fin"
                        secondary={new Date(selectedSession.endTime).toLocaleString()}
                      />
                    </ListItem>
                  </>
                )}
              </List>
            </DialogContent>
            <DialogActions>
              {selectedSession.isActive && (
                <Button
                  onClick={() => {
                    handleCloseDialog();
                    handleOpenEndDialog(selectedSession);
                  }}
                  color="error"
                  startIcon={<Close />}
                >
                  Finalizar Sesión
                </Button>
              )}
              <Button onClick={handleCloseDialog}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* End Session Confirmation Dialog */}
      <Dialog open={endDialogOpen} onClose={handleCloseEndDialog}>
        <DialogTitle>Finalizar Sesión</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} mb={2}>
            <Info color="warning" />
            <Typography>
              ¿Estás seguro de que deseas finalizar la sesión de la Mesa{' '}
              {selectedSession && getTableNumber(selectedSession.tableId)}?
            </Typography>
          </Box>
          <Alert severity="warning">
            Esta acción no se puede deshacer. La sesión se marcará como completada.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEndDialog}>Cancelar</Button>
          <Button onClick={handleEndSession} color="error" variant="contained">
            Finalizar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SessionsPage;