import { useState, useEffect } from 'react';
import { ProductService } from '../services/productService';
import type { Product } from '../types';

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing a single product data and loading states
 */
export const useProduct = (id: number): UseProductState => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const productData = await ProductService.getProductById(id);
      setProduct(productData);
      
    } catch (err) {
      console.error(`🟦 FRONTEND ERROR: Error in useProduct hook for ID ${id}:`, err);
      setError(err instanceof Error ? err.message : 'Failed to load product. Please try again later.');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};