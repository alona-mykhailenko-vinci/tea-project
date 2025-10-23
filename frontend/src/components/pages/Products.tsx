import Navbar from '../Navbar';
import ProductCard from '../ProductCard';
import { Spinner } from '../ui/spinner';
import { useProducts } from '../../hooks/useProducts';

const Products = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-lg text-tea-dark">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl text-tea-dark mb-4 font-semibold">
            Our Tea Collection
          </h1>
        </div>
        
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-4 gap-4 max-w-5xl w-full">
            {products.map((product) => (
              <ProductCard key={product.id_product} product={product} />
            ))}
          </div>
        </div>
        
        {products.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-lg text-tea-medium">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;