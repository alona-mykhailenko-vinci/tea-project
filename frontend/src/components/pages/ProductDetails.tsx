import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { Button } from '../ui/button';
import Navbar from '../Navbar';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  const { product, loading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-charcoal">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-600">{error || 'Product not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-center">
          <div className="flex items-start gap-12 max-w-4xl w-full">
            
            {/* Left side - Product Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-96 h-96 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/384x384/2c5530/ffffff?text=Tea';
                }}
              />
            </div>

            {/* Right side - Product Details */}
            <div className="flex-1 space-y-6">
              
              {/* Product Name */}
              <h1 className="text-3xl font-semibold text-charcoal">
                {product.name}
              </h1>

              {/* Price per Unity */}
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-charcoal">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-charcoal">
                  per {product.unity}
                </p>
              </div>

              {/* Product Description */}
              <p className="text-lg text-charcoal leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selection */}
              <div className="space-y-3">
                <label htmlFor="quantity" className="block text-sm font-medium text-charcoal">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-light-beige transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-8 h-8 text-center focus:outline-none focus:ring-2 focus:ring-brown-dark"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-light-beige transition-colors"
                    disabled={quantity >= product.stock_quantity}
                  >
                    +
                  </button>
                  <span className="text-sm text-charcoal ml-2">
                    × {product.unity} each
                  </span>
                </div>
                
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full bg-brown-dark text-white hover:bg-charcoal transition-colors"
                onClick={() => {
                  // TODO: Implement add to cart functionality
                  console.log('Add to cart clicked for product:', product.name, 'Quantity:', quantity, 'Total:', (product.price * quantity).toFixed(2));
                }}
              >
                Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;