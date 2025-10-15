import {
  Box,
  Container,
  Heading,
  Text,
  Spinner
} from '@chakra-ui/react';
import Navbar from '../Navbar';
import ProductCard from '../ProductCard';
import { useProducts } from '../../hooks/useProducts';

const Products = () => {
  const { products, loading, error } = useProducts();

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