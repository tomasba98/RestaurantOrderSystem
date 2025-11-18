import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, CardActions, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, Chip, Alert, CircularProgress, InputAdornment, } from '@mui/material';
import { Add, Edit, Delete, Search, Refresh, Visibility, VisibilityOff, } from '@mui/icons-material';
import { useProducts } from '@/aplication/hooks/product/useProducts';
import type { Product } from '@/domain/entities/Product';
import type { CreateProductData, UpdateProductData } from '@/domain/repositories/IProductRepository';

const ProductsPage: React.FC = () => {
  const {
    products,
    isLoading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    clearError,
    getAvailableCount,
    getUnavailableCount,
    searchProducts,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    price: 0,
    description: '',
    isAvailable: true,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(searchProducts(searchTerm));
  }, [searchTerm, products]);

  const handleOpenCreateDialog = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      price: 0,
      description: '',
      isAvailable: true,
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setDialogMode('edit');
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      isAvailable: product.isAvailable,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      price: 0,
      description: '',
      isAvailable: true,
    });
  };

  const handleSubmit = async () => {
    try {
      if (dialogMode === 'create') {
        await createProduct(formData);
      } else if (selectedProduct) {
        const updateData: UpdateProductData = {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          isAvailable: formData.isAvailable,
        };
        await updateProduct(selectedProduct.id, updateData);
      }
      handleCloseDialog();
      loadProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        handleCloseDeleteDialog();
        loadProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      await toggleAvailability(product.id);
      loadProducts();
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  if (isLoading && products.length === 0) {
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
            Gestión de Productos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getAvailableCount()} disponibles • {getUnavailableCount()} no disponibles
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreateDialog}
          >
            Nuevo Producto
          </Button>
          <IconButton onClick={() => loadProducts()}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Products Grid */}
      <Grid container spacing={2}>
        {filteredProducts.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="info">No se encontraron productos</Alert>
          </Grid>
        ) : (
          filteredProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  borderLeft: '4px solid',
                  borderLeftColor: product.isAvailable ? 'success.main' : 'error.main',
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {product.name}
                    </Typography>
                    <Chip
                      label={product.isAvailable ? 'Disponible' : 'No disponible'}
                      color={product.isAvailable ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>

                  {product.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>
                  )}

                  <Typography variant="h5" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>

                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleToggleAvailability(product)}
                    title={product.isAvailable ? 'Marcar no disponible' : 'Marcar disponible'}
                  >
                    {product.isAvailable ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenEditDialog(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(product)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Crear Producto' : 'Editar Producto'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <TextField
              label="Precio"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />

            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                />
              }
              label="Disponible"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || formData.price <= 0}
          >
            {dialogMode === 'create' ? 'Crear' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el producto "{productToDelete?.name}"?
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsPage;