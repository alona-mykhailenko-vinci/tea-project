import { useState, useEffect } from 'react';
import { ProductService } from '../services/productService';
import type { Product } from '../types';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing products data and loading states
 */
export const useProducts = (): UseProductsState => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const productsData = await ProductService.getProducts();
      setProducts(productsData);
      
    } catch (err) {
      console.error('🟦 FRONTEND ERROR: Error in useProducts hook:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};