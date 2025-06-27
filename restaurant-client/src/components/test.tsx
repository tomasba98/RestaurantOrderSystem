import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Alert,
  Fab,
  Chip,
  TextField, 
  Card,     
  CardContent, 
  CardActions, 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Link } from 'react-router-dom';

function ColorPaletteTester() {
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Barra de Aplicación - Primary */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}> {/* Usamos h4 */}
            Sistema de Órdenes
          </Typography>
          <Button 
          color="primary" 
          component={Link}
          to="/login">
            Iniciar Sesión</Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: 'text.primary' }}>
        Prueba de Tema - Elegancia Moderna
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}> {/* Más espacio entre secciones */}

        <Paper elevation={1} sx={{ p: 3, }}> {/* Elevación más suave */}
          <Typography variant="h6" gutterBottom>
            Botones y Acciones
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary">
              Enviar Orden
            </Button>
            <Button variant="outlined" color="primary">
              Ver Detalles
            </Button>
            <Button variant="text" color="primary">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" disabled>
              Deshabilitado
            </Button>
            <Fab color="secondary" aria-label="add" size="medium"> {/* Tamaño medium */}
              <AddIcon />
            </Fab>
          </Box>
        </Paper>

        {/* Campos de Texto */}
        <Paper elevation={1} sx={{ p: 3, }}>
          <Typography variant="h6" gutterBottom>
            Campos de Entrada
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre del Cliente"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Notas del Pedido"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Cantidad (Deshabilitado)"
              variant="outlined"
              defaultValue="2"
              disabled
              fullWidth
            />
          </Box>
        </Paper>

        {/* Mensajes de Alerta */}
        <Paper elevation={1} sx={{ p: 3, }}>
          <Typography variant="h6" gutterBottom>
            Mensajes de Alerta
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success">
              ¡Orden enviada correctamente!
            </Alert>
            <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">
              Hay 3 órdenes pendientes de cocina.
            </Alert>
            <Alert icon={<WarningAmberOutlinedIcon fontSize="inherit" />} severity="warning">
              Un ítem del pedido está agotado.
            </Alert>
            <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
              Error al procesar el pago.
            </Alert>
          </Box>
        </Paper>

        {/* Chips y Texto */}
        <Paper elevation={1} sx={{ p: 3, }}>
          <Typography variant="h6" gutterBottom>
            Chips y Texto
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip label="Pendiente" color="warning" />
            <Chip label="Completado" color="success" />
            <Chip label="En Preparación" color="info" />
            <Chip label="Nuevo Pedido" color="primary" />
            <Chip label="Con Descuento" color="secondary" />
            <Chip label="Cancelado" color="error" />
          </Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Este es un ejemplo de texto principal (`body1`) utilizando el color `text.primary`. Debería ser muy legible en este fondo cálido. Aquí aplicamos una fuente más tradicional y elegante para los títulos, y Roboto para el cuerpo del texto.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Este es un texto secundario o descriptivo (`body2`), utilizando el color `text.secondary`. Ideal para detalles menores, notas o descripciones adicionales en el sistema.
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Información de copyright o notas pequeñas (`caption`).
          </Typography>
        </Paper>

        {/* Ejemplo de Card - Menú Item / Order Summary */}
        <Card elevation={2} sx={{ borderRadius: 8 }}> {/* Card con elevación sutil */}
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Orden #1234 - Mesa 5
            </Typography>
            <Typography variant="body1" color="text.primary">
              **2x** Pasta Carbonara <br />
              **1x** Ensalada César <br />
              **3x** Refrescos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Estado: <Chip label="En Preparación" color="info" size="small" />
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Button size="small" color="primary" variant="outlined">
              Ver Detalles
            </Button>
            <Button size="small" color="secondary" variant="contained">
              Marcar Listo
            </Button>
          </CardActions>
        </Card>

      </Box>
    </Container>
  );
}

export default ColorPaletteTester;