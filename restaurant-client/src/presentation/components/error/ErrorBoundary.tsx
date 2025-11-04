import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("💥 Error capturado por ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
            p: 3,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: 500,
              textAlign: "center",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <ErrorOutlineIcon
                color="error"
                sx={{ fontSize: 60 }}
              />
              <Typography variant="h5" fontWeight="bold">
                Ocurrió un error inesperado
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Algo salió mal al renderizar esta sección.  
                Por favor, recargá la página o volvé a intentarlo más tarde.
              </Typography>

              {/* Mostrar detalles solo en desarrollo */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <Paper
                  variant="outlined"
                  sx={{
                    mt: 2,
                    p: 2,
                    textAlign: "left",
                    bgcolor: (theme) => theme.palette.background.paper,
                    maxHeight: 200,
                    overflow: "auto",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle2" color="error">
                    {this.state.error.name}: {this.state.error.message}
                  </Typography>
                </Paper>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReload}
                sx={{ mt: 2 }}
              >
                Recargar página
              </Button>
            </Stack>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
