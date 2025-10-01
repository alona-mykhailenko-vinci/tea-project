import { Link } from 'react-router-dom';
import { Box, Flex, Heading, HStack, Link as ChakraLink } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box as="nav" bg="#4F493F" color="white" px={4} py={3} shadow="md">
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading as="h1" size="lg" color="white" fontFamily="'Montserrat', sans-serif" fontWeight="600" _hover={{ color: 'green.100' }}>
            TeaShop
          </Heading>
        </Link>
        <HStack gap={6}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ChakraLink color="white" fontWeight="400" fontFamily="'Montserrat', sans-serif" _hover={{ color: 'green.100' }}>
              Home
            </ChakraLink>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <ChakraLink color="white" fontWeight="400" fontFamily="'Montserrat', sans-serif" _hover={{ color: 'green.100' }}>
              Products
            </ChakraLink>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;