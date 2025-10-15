import { apiRequest } from './api';
import type { ApiResponse } from './api';
import type { Product } from '../types';

/**
 * Service for handling product-related API calls
 */
export class ProductService {
  /**
   * Fetch all products from the backend
   */
  static async getProducts(): Promise<Product[]> {
    try {
      console.log('🟦 FRONTEND: Starting to fetch products from API...');
      
      const response = await apiRequest<ApiResponse<Product[]> | Product[]>('products');
      
      // Handle different response formats from backend
      let productsData: Product[];
      
      if ('success' in response && response.success && response.data) {
        console.log('🟦 FRONTEND: Success response detected, using data.data');
        productsData = response.data;
      } else if (Array.isArray(response)) {
        console.log('🟦 FRONTEND: Direct array response detected');
        productsData = response;
      } else {
        console.log('🟦 FRONTEND: Unexpected response format, defaulting to empty array');
        productsData = [];
      }
      
      console.log('🟦 FRONTEND: Products successfully retrieved:', productsData.length, 'items');
      return Array.isArray(productsData) ? productsData : [];
      
    } catch (error) {
      console.error('🟦 FRONTEND ERROR: Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProductById(id: number): Promise<Product> {
    try {
      console.log(`🟦 FRONTEND: Fetching product with ID: ${id}`);
      
      const response = await apiRequest<ApiResponse<Product> | Product>(`products/${id}`);
      
      // Handle different response formats
      if ('success' in response && response.success && response.data) {
        return response.data;
      } else if ('id_product' in response) {
        return response as Product;
      } else {
        throw new Error('Invalid product response format');
      }
      
    } catch (error) {
      console.error(`🟦 FRONTEND ERROR: Error fetching product ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new product (if needed in the future)
   */
  static async createProduct(productData: Omit<Product, 'id_product'>): Promise<Product> {
    try {
      console.log('🟦 FRONTEND: Creating new product:', productData.name);
      
      const response = await apiRequest<ApiResponse<Product> | Product>('products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      
      if ('success' in response && response.success && response.data) {
        return response.data;
      } else if ('id_product' in response) {
        return response as Product;
      } else {
        throw new Error('Invalid create product response format');
      }
      
    } catch (error) {
      console.error('🟦 FRONTEND ERROR: Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update an existing product (if needed in the future)
   */
  static async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    try {
      console.log(`🟦 FRONTEND: Updating product ${id}`);
      
      const response = await apiRequest<ApiResponse<Product> | Product>(`products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      
      if ('success' in response && response.success && response.data) {
        return response.data;
      } else if ('id_product' in response) {
        return response as Product;
      } else {
        throw new Error('Invalid update product response format');
      }
      
    } catch (error) {
      console.error(`🟦 FRONTEND ERROR: Error updating product ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a product (if needed in the future)
   */
  static async deleteProduct(id: number): Promise<void> {
    try {
      console.log(`🟦 FRONTEND: Deleting product ${id}`);
      
      await apiRequest(`products/${id}`, {
        method: 'DELETE',
      });
      
      console.log(`🟦 FRONTEND: Product ${id} deleted successfully`);
      
    } catch (error) {
      console.error(`🟦 FRONTEND ERROR: Error deleting product ${id}:`, error);
      throw error;
    }
  }
}

export default ProductService;