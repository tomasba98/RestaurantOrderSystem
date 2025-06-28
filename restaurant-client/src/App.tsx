import theme from './theme/theme';
import { ThemeProvider, CssBaseline, Table } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import ColorPaletteTester from './components/test';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Roles } from './types';
import NavBar from './components/NavBar';
import TablesPage from './pages/table/tables';
import TablesOverview from './pages/table/tables2';
import HallLayout from './pages/hall/HallLayout';



function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/" element={<ColorPaletteTester />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/tables2" element={<TablesOverview />} />
          <Route path="/tables3" element={<HallLayout />} />
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