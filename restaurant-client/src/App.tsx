// App.jsx
import theme from './theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import ColorPaletteTester from './presentation/components/ColorPaletteTester';
import { AuthProvider } from './aplication/context/AuthContext';
import NavBar from './presentation/components/shared/NavBar';
import ProtectedRoute from './presentation/components/auth/ProtectedRoute';
import { Roles } from './domain/entities/User';
import { ErrorBoundary } from './presentation/components/error/ErrorBoundary';
import { Suspense, lazy } from 'react';
import SessionsPage from './presentation/pages/session/SessionPage';
import RegisterPage from './presentation/pages/auth/RegisterPage';
import LoginPage from './presentation/pages/auth/LoginPage';

const ProductsPage = lazy(() => import('./presentation/pages/product/ProductPage'));
const HallLayout = lazy(() => import('./presentation/pages/hall/HallPage'));
const OrdersPage = lazy(() => import('./presentation/pages/order/OrdersPage'));
const KitchenPage = lazy(() => import('./presentation/pages/kitchen/KitchenPage'));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorBoundary>

          {/* Suspense GLOBAL for all lazy*/}
          <Suspense fallback={<div style={{ padding: 40 }}>Cargando...</div>}>

            <NavBar />

            <Routes>

              {/* Inicio / colores */}
              <Route path="/" element={<ColorPaletteTester />} />

              {/* Autenticación */}
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/register"
                element={
                  // Público por ahora 
                  <RegisterPage />
                }
              />

              {/* Gestión de Mesas (Admin, Manager, Waiter) */}
              <Route
                path="/hall"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Waiter]}>
                    <HallLayout />
                  </ProtectedRoute>
                }
              />

              {/* Órdenes */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Waiter]}>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />

              {/* Cocina */}
              <Route
                path="/kitchen"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager, Roles.Kitchen]}>
                    <KitchenPage />
                  </ProtectedRoute>
                }
              />

              {/* Productos */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager]}>
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />

              {/* Sesiones  */}
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute requiredRoles={[Roles.Admin, Roles.Manager]}>
                    <SessionsPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                      flexDirection: 'column',
                    }}
                  >
                    <h1>404 - Página no encontrada</h1>
                    <p>La página que buscas no existe.</p>
                  </div>
                }
              />

            </Routes>
          </Suspense>

        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}
