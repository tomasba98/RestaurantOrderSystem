import theme from './theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import ColorPaletteTester from './presentation/components/ColorPaletteTester';
import LoginPage from './presentation/pages/auth/Login';
import RegisterPage from './presentation/pages/auth/Register';
import HallLayout from './presentation/pages/hall/HallLayout';
import { AuthProvider } from './aplication/context/AuthContext';
import NavBar from './presentation/components/shared/NavBar';
import ProtectedRoute from './presentation/components/auth/ProtectedRoute';
import { Roles } from './domain/entities/User';



function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<ColorPaletteTester />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={
            <ProtectedRoute requiredRole={Roles.Admin}>
             <RegisterPage />
          </ProtectedRoute>} />
          {/* <Route path="/hall" element={<HallLayout />} /> */}
          {/* <Route path="/orders" element={<OrdersPage />} /> */}

          {/* Rutas protegidas - requieren autenticación */}
          <Route path="/dashboard" element={
                  <ProtectedRoute requiredRole={Roles.Admin}>
                    {/* <Dashboard /> */}
                    <div>Dashboard - Reemplaza con tu componente</div>
                  </ProtectedRoute>
                } />
          


          {/* Ruta catch-all para páginas no encontradas */}
          <Route path="*" element={
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    flexDirection: 'column'
                  }}>
                    <h1>404 - Página no encontrada</h1>
                    <p>La página que buscas no existe.</p>
                  </div>
                } />
        </Routes>
    </AuthProvider>
  </ThemeProvider>
  )
}

export default App