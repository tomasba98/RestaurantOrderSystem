import theme from './theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import ColorPaletteTester from './components/test';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<ColorPaletteTester />} />
      {/* <Route path="/ordenes" element={<OrdersPage />} /> */}
    </Routes>
  </ThemeProvider>
  )
}

export default App