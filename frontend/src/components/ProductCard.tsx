import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useProductContext } from '../context/ProductContext';
import type { ProductCardProps } from '../types';

const ProductCard = ({ product }: ProductCardProps) => {
  const { setSelectedProduct } = useProductContext();

  const handleSelectProduct = () => {
    setSelectedProduct(product);
  };

  return (
    <Card className="bg-white border-tea-light p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
      <CardContent className="p-0 flex flex-col items-center w-full">
        {/* Product Image */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-40 h-40 object-contain mb-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/160x160/2c5530/ffffff?text=Tea';
          }}
        />

        {/* Product Name */}
        <p className="text-sm font-light text-tea-dark text-center mb-1">
          {product.name}
        </p>
        
        {/* Product Price */}
        <p className="text-sm text-tea-medium mb-3">
          ${product.price.toFixed(2)}
        </p>

        {/* Add Button */}
        <Button
          variant="outline"
          size="sm"
          className="text-xs px-3 py-1 h-auto border-tea-medium text-tea-medium hover:bg-tea-medium hover:text-white"
          onClick={handleSelectProduct}
        >
          SELECT
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;