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
        <p className="text-sm text-charcoal text-center mb-1">
          {product.name}
        </p>
        
        {/* Product Price */}
        <p className="text-sm font-light text-charcoal mb-3">
          ${product.price.toFixed(2)}
        </p>

        {/* Select Text */}
        <span
          className="text-sm text-charcoal cursor-pointer hover:underline transition-colors"
          onClick={handleSelectProduct}
        >
          select
        </span>
      </CardContent>
    </Card>
  );
};

export default ProductCard;