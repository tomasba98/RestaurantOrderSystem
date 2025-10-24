import { useState, useCallback } from 'react';
import type { Product } from '@/domain/entities/Product';
import type { CreateProductData, UpdateProductData } from '@/domain/repositories/IProductRepository';
import type { PaginationParams, PaginatedResponse } from '@/utils/Pagination';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/ProductRepositoryImpl';
import { CreateProductUseCase } from '@/domain/usecases/product/CreateProductUseCase';
import { ToggleProductAvailabilityUseCase } from '@/domain/usecases/product/ToggleProductAvailabilityUseCase';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const productRepository = new ProductRepositoryImpl();
  
  const createProductUseCase = new CreateProductUseCase(productRepository);
  const toggleProductAvailabilityUseCase = new ToggleProductAvailabilityUseCase(productRepository);

  // Get all products
  const loadProducts = useCallback(async (): Promise<Product[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const response : Product[] = await productRepository.getAll();
      setProducts(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar los productos';
      setError(errorMessage);
      console.error('Error loading products:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get available products
  const loadAvailableProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const availableProducts = await productRepository.getAvailable();
      setProducts(availableProducts);
      return availableProducts;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar productos disponibles';
      setError(errorMessage);
      console.error('Error loading available products:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get product by ID
  const loadProductById = useCallback(async (id: string): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const product = await productRepository.getById(id);
      setCurrentProduct(product);
      return product;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar el producto';
      setError(errorMessage);
      console.error('Error loading product:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new product
  const createProduct = useCallback(async (data: CreateProductData): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const newProduct = await createProductUseCase.execute(data);
      setProducts(prev => [newProduct, ...prev]);
      setCurrentProduct(newProduct);
      return newProduct;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear el producto';
      setError(errorMessage);
      console.error('Error creating product:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (
    id: string,
    data: UpdateProductData
  ): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProduct = await productRepository.update(id, data);
      
      setProducts(prev =>
        prev.map(product => product.id === id ? updatedProduct : product)
      );
      
      if (currentProduct?.id === id) {
        setCurrentProduct(updatedProduct);
      }
      
      return updatedProduct;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar el producto';
      setError(errorMessage);
      console.error('Error updating product:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentProduct]);

  // Delete product
  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await productRepository.delete(id);
      
      setProducts(prev => prev.filter(product => product.id !== id));
      
      if (currentProduct?.id === id) {
        setCurrentProduct(null);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar el producto';
      setError(errorMessage);
      console.error('Error deleting product:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentProduct]);

  // Toggle product availability
  const toggleAvailability = useCallback(async (id: string): Promise<Product> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProduct = await toggleProductAvailabilityUseCase.execute(id);
      
      setProducts(prev =>
        prev.map(product => product.id === id ? updatedProduct : product)
      );
      
      if (currentProduct?.id === id) {
        setCurrentProduct(updatedProduct);
      }
      
      return updatedProduct;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cambiar disponibilidad';
      setError(errorMessage);
      console.error('Error toggling availability:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentProduct]);

  // Clean error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clean current product
  const clearCurrentProduct = useCallback(() => {
    setCurrentProduct(null);
  }, []);

  // Get available products count
  const getAvailableCount = useCallback((): number => {
    return products.filter(p => p.isAvailable).length;
  }, [products]);

  // Get unavailable products count
  const getUnavailableCount = useCallback((): number => {
    return products.filter(p => !p.isAvailable).length;
  }, [products]);

  // Search products by name
  const searchProducts = useCallback((searchTerm: string): Product[] => {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term)
    );
  }, [products]);

  return {
    products,
    currentProduct,
    isLoading,
    error,
    loadProducts,
    loadAvailableProducts,
    loadProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    clearError,
    clearCurrentProduct,
    getAvailableCount,
    getUnavailableCount,
    searchProducts,
  };
};