import Navbar from '../Navbar';
import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" py={20}>
        <VStack gap={8} textAlign="center">
          <Heading as="h1" size="4xl" color="green.700" fontWeight="600" fontFamily="'Montserrat', sans-serif">
            TeaShop
          </Heading>
          <Heading as="h2" size="xl" color="green.600" fontWeight="400" fontFamily="'Montserrat', sans-serif">
            Welcome to our premium tea collection
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" lineHeight="tall" fontFamily="'Montserrat', sans-serif">
            Discover the finest selection of teas from around the world. 
            From traditional green teas to exotic herbal blends, we have 
            something special for every tea lover.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;