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
import OrdersPage from './presentation/pages/order/OrdersPage';
import KitchenPage from './presentation/pages/kitchen/KitchenPage';
import ProductsPage from './presentation/pages/product/ProductPage';
import SessionsPage from './presentation/pages/session/SessionPage';
import { ErrorBoundary } from './presentation/components/error/ErrorBoundary';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorBoundary>
          <NavBar />
            <Routes>
              {/* Test Colores */}
              <Route path="/" element={<ColorPaletteTester />} />
              
              {/* Autenticación */}
              <Route path="/login" element={<LoginPage />} />

              {/* Gestión de Usuarios - Admin y Manager */}
              <Route 
                path="/register" 
                element={
                  // Publico por ahora
                  // <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager]}> 
                    <RegisterPage />
                  // </ProtectedRoute>
                } 
              />

              {/* Gestión de Mesas - Admin, Manager y Waiter */}
              <Route
                path="/hall"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Waiter]}>
                    <HallLayout />
                  </ProtectedRoute>
                }
              />
              
              {/* Gestión de Órdenes - Admin, Manager y Waiter */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Waiter]}>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Vista de Cocina - Admin, Manager y Kitchen */}
              <Route
                path="/kitchen"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Kitchen]}>
                    <KitchenPage />
                  </ProtectedRoute>
                }
              />

              {/* Gestión de Productos - Admin y Manager */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager]}>
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />

              {/* Gestión de Productos - Admin y Manager */}
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager]}>
                    <SessionsPage />
                  </ProtectedRoute>
                }
              />

              {/* Ruta catch-all para páginas no encontradas */}
              <Route 
                path="*" 
                element={
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
                } 
              />
            </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;