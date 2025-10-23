import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import type { ProductCardProps } from '../types';

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log('Add product clicked:', product.name);
  };

  return (
    <Link to={`/products/${product.id_product}`} className="no-underline">
      <Card className="bg-white border-0 p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer">
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
          <p className="text-sm font-light text-charcoal text-center mb-1">
            {product.name}
          </p>
          
          {/* Product Price */}
          <p className="text-sm text-charcoal mb-3">
            ${product.price.toFixed(2)}
          </p>

        {/* Add Button */}
        <span
          className="text-sm text-charcoal cursor-pointer hover:underline transition-colors"
          onClick={handleAddProduct}
        >
          + add
        </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;