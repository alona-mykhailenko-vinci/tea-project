import { Box, Image, Text, Button } from '@chakra-ui/react';
import type { ProductCardProps } from '../types';

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Product Image */}
      <Image
        src={product.image_url}
        alt={product.name}
        width="160px"
        height="160px"
        objectFit="contain"
        mb={4}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/160x160/2c5530/ffffff?text=Tea';
        }}
      />

      {/* Product Name */}
      <Text
        fontSize="14px"
        fontWeight="300"
        color="gray.800"
        textAlign="center"
        mb={1}
      >
        {product.name}
      </Text>
      
      {/* Product Price */}
      <Text
        fontSize="14px"
        color="gray.600"
        mb={3}
      >
        ${product.price.toFixed(2)}
      </Text>

      {/* Add Button */}
      <Button
        fontSize="12px"
        px={3}
        py={1}
        border="1px solid"
        borderColor="gray.400"
        borderRadius="4px"
        bg="white"
        color="black"
        _hover={{
          bg: "gray.100"
        }}
        size="sm"
        height="auto"
      >
        + ADD
      </Button>
    </Box>
  );
};

export default ProductCard;