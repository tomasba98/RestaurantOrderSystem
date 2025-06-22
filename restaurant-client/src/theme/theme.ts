import { createTheme } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';

const defaultTheme = createTheme();

const theme = createTheme({
     palette: {
    primary: {
      main: '#785F60', 
      light: '#A38B8C',
      dark: '#523A3B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A69F8B', 
      light: '#C2BDA8',
      dark: '#827B67',
      contrastText: '#FFFFFF', 
    },
    error: {
      main: '#C62828',
      light: '#EF5350',
      dark: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800', 
      light: '#FFB74D',
      dark: '#FB8C00',
      contrastText: '#212121',
    },
    info: {
      main: '#2196F3', 
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#36454F', 
      secondary: '#696969', 
      disabled: '#A9A9A9',
    },
    background: {
      default: '#F5F5DC', 
      paper: '#FFFFFF',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    divider: '#DCDCDC', 
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'Roboto',           
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#36454F', 
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#36454F',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#36454F',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#36454F',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#36454F',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#36454F',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#36454F',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#696969', 
    },
    button: {
      textTransform: 'none', 
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#696969',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      color: '#696969',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none', 
    '0px 1px 3px rgba(0, 0, 0, 0.05)',
    '0px 2px 6px rgba(0, 0, 0, 0.06)',
    '0px 4px 10px rgba(0, 0, 0, 0.07)',
    ...defaultTheme.shadows.slice(4),
  ] as Shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
          borderRadius: 8,      
          fontWeight: 500,
          padding: '8px 20px', 
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#523A3B', 
          },
        },
        outlinedPrimary: {
          border: '1px solid #785F60',
          '&:hover': {
            backgroundColor: 'rgba(120, 95, 96, 0.04)', 
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(120, 95, 96, 0.04)', 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)', 
          backgroundColor: '#FFFFFF', 
          color: '#36454F', 
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, 
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)', 
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#DCDCDC', 
            },
            '&:hover fieldset': {
              borderColor: '#A69F8B', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#785F60', 
            },
          },
        },
      },
    },
    MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8, 
            fontWeight: 500,
          },          
          colorPrimary: {
            backgroundColor: '#A38B8C', 
            color: '#FFFFFF',
          },          
          colorSecondary: {
            backgroundColor: '#C2BDA8', 
            color: '#36454F', 
          },          
          colorSuccess: {
            backgroundColor: '#81C784', 
            color: '#FFFFFF', 
          },          
          colorWarning: {
            backgroundColor: '#FFB74D', 
            color: '#212121', 
          },          
          colorError: {
            backgroundColor: '#EF5350', 
            color: '#FFFFFF', 
          },         
          colorInfo: {
            backgroundColor: '#64B5F6', 
            color: '#FFFFFF', 
          }
        },
      },
    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                fontWeight: 500,
            },
            standardSuccess: {
                backgroundColor: '#E8F5E9', 
                color: '#388E3C', 
            },
            standardInfo: {
                backgroundColor: '#E3F2FD', 
                color: '#1976D2',
            },
            standardWarning: {
                backgroundColor: '#FFFDE7', 
                color: '#FB8C00',
            },
            standardError: {
                backgroundColor: '#FFEBEE', 
                color: '#C62828',
            },
        }
    },
  },
});

export default theme;
