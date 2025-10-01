// Product interface
export interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  unity: string;
  stock_quantity: number;
  image_url: string;
}

// ProductCard component props
export interface ProductCardProps {
  product: Product;
}