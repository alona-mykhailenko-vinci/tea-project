import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Product = {
  id_product: number;
  name: string;
  description: string;
  price: number;
  unity: string;
  stock_quantity: number;
  image_url: string;
};

type ProductContextType = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used inside a ProductProvider");
  }
  return context;
};