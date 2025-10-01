import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const host = 'http://localhost:3000';

  const sendApiRequestandHandleError = async (method: string = 'GET', path: string, body?: unknown) => {
    try {
      console.log(`🟦 FRONTEND: Making ${method} request to: ${host}/api/${path}`);
      
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : null,
      });

      console.log('🟦 FRONTEND: Response status:', response.status);
      console.log('🟦 FRONTEND: Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🟦 FRONTEND: Response data:', data);
      return data;
    } catch (error) {
      console.error('🟦 FRONTEND ERROR: API request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      throw error;
    }
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      console.log('🟦 FRONTEND: Starting to fetch products from API...');
      setLoading(true);
      const data = await sendApiRequestandHandleError('GET', 'products');
      
      // Handle the response structure from your backend
      let productsData;
      if (data.success && data.data) {
        console.log('🟦 FRONTEND: Success response detected, using data.data');
        productsData = data.data;
      } else if (Array.isArray(data)) {
        console.log('🟦 FRONTEND: Direct array response detected');
        productsData = data;
      } else {
        console.log('🟦 FRONTEND: Unexpected response format, defaulting to empty array');
        productsData = [];
      }
      
      // Ensure data is an array before setting state
      setProducts(Array.isArray(productsData) ? productsData : []);
      console.log('🟦 FRONTEND: Products successfully set in state:', productsData.length, 'items');
      setError(null);
    } catch (err) {
      console.error('🟦 FRONTEND ERROR: Error in fetchProducts:', err);
      setProducts([]);
    } finally {
      setLoading(false);
      console.log('🟦 FRONTEND: Fetch products process completed');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('� FRONTEND: Starting to fetch products from API...');
        setLoading(true);
        
        console.log('� FRONTEND: Making request to: http://localhost:3000/api/products');
        // This code should be removed
        
        
        // Handle the response structure from your backend
        // This duplicate function should not be used - using the one above instead
        console.log('🟦 FRONTEND: This function is a duplicate and should be removed');
        
        // Success logging removed
      } catch (err) {
        console.error('🟦 FRONTEND ERROR: Error fetching products:', err);
        console.error('🟦 FRONTEND ERROR: Unknown error:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
        console.log('🟦 FRONTEND: Fetch products process completed');
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Container maxW="container.xl" py={8}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <Spinner size="xl" color="green.500" />
            <Text fontSize="lg" fontFamily="'Montserrat', sans-serif">Loading products...</Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Container maxW="container.xl" py={8}>
          <Box bg="red.50" border="1px solid" borderColor="red.200" borderRadius="md" p={4}>
            <Text color="red.600" fontFamily="'Montserrat', sans-serif">{error}</Text>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" color="#4F493F" mb={4} fontFamily="'Montserrat', sans-serif" fontWeight="600">
            Our Tea Collection
          </Heading>
          <Text fontSize="lg" color="gray.600" fontFamily="'Montserrat', sans-serif">
            Discover our premium selection of teas from around the world
          </Text>
        </Box>
        
        <Box 
          display="flex" 
          justifyContent="center" 
          width="100%"
        >
          <Box 
            display="grid" 
            gridTemplateColumns="repeat(4, 1fr)" 
            gap="10px"
            maxWidth="1000px"
            width="100%"
            justifyItems="center"
          >
            {products.map((product) => (
              <ProductCard key={product.id_product} product={product} />
            ))}
          </Box>
        </Box>
        
        {products.length === 0 && !loading && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500" fontFamily="'Montserrat', sans-serif">
              No products available at the moment.
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products;