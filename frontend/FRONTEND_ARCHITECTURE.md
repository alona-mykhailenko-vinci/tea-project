# Frontend Architecture Documentation

This document describes the new, improved frontend architecture that follows React best practices and provides better separation of concerns.

## 📁 Folder Structure

```
src/
├── components/
│   ├── pages/                 # Page components (formerly standalone pages folder)
│   │   ├── Home.tsx          # Home page component
│   │   └── Products.tsx      # Products page component
│   ├── Navbar.tsx            # Navigation bar component
│   ├── ProductCard.tsx       # Product card component
│   └── index.ts              # Centralized component exports
├── context/
│   └── ProductContext.tsx    # Product selection state management
├── hooks/
│   ├── useProducts.ts        # Hook for managing products data
│   ├── useProduct.ts         # Hook for managing single product data
│   └── useAsync.ts           # Generic async operations hook
├── services/
│   ├── api.ts                # Base API utilities and error handling
│   └── productService.ts     # Product-specific API calls
├── types/
│   └── index.ts              # TypeScript type definitions
├── styles/
│   └── globals.css           # Global styles
├── assets/                   # Static assets
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## 🏗️ Architecture Overview

### 1. **Components Structure**
- **Pages are now inside components folder** (`components/pages/`)
- Each component has a single responsibility
- Direct imports from specific files for clarity

### 2. **Services Layer**
- **Complete separation of API logic** from components
- Centralized error handling and logging
- Reusable API utilities
- Type-safe responses

#### Key Services:
- `api.ts`: Base API configuration and utilities
- `productService.ts`: Product-specific CRUD operations

### 3. **Custom Hooks**
- **Encapsulate business logic and state management**
- Reusable across multiple components
- Cleaner component code

#### Available Hooks:
- `useProducts`: Manages products list, loading, and error states
- `useProduct`: Manages single product data
- `useAsync`: Generic async operation handler

### 4. **Context Management**
- **Simple product selection state management**
- Focused context for managing selected product
- Clean and lightweight implementation

#### Context Features:
- Selected product management
- Type-safe product selection
- Simple state updates

## 🔄 Data Flow

```
User Interaction → Component → Hook → Service → Backend API
                                ↓
Component ← Context/State ← Hook ← Service Response
```

## 📋 Key Benefits

### ✅ **Improved Organization**
- Clear separation of concerns
- Logical folder structure
- Easy to navigate and maintain

### ✅ **Reusability**
- Custom hooks can be used across components
- Services can be reused for different UI components
- Context provides global state access

### ✅ **Type Safety**
- Full TypeScript support
- Type-safe API responses
- Proper error handling

### ✅ **Maintainability**
- Single responsibility principle
- Easy to test individual parts
- Scalable architecture

### ✅ **Performance**
- Optimized re-renders
- Proper state management
- Efficient API calls

## 🚀 Usage Examples

### Using the Products Hook
```tsx
import { useProducts } from '../hooks/useProducts';

const ProductsComponent = () => {
  const { products, loading, error, refetch } = useProducts();
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id_product} product={product} />
      ))}
    </div>
  );
};
```

### Using the Product Context
```tsx
import { useProductContext } from '../context/ProductContext';

const ProductSelector = ({ product }) => {
  const { selectedProduct, setSelectedProduct } = useProductContext();
  
  return (
    <Button onClick={() => setSelectedProduct(product)}>
      {selectedProduct?.id_product === product.id_product ? 'Selected' : 'Select'}
    </Button>
  );
};
```

### Using Services Directly
```tsx
import { ProductService } from '../services/productService';

const fetchProductData = async (id: number) => {
  try {
    const product = await ProductService.getProductById(id);
    console.log(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
};
```

## 🔧 Configuration

### API Configuration
Update the base API URL in `services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Context Initial State
The ProductContext uses simple useState initialization:
```typescript
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
```

## 🧪 Testing

The new architecture makes testing easier:

- **Services**: Test API calls in isolation
- **Hooks**: Test business logic separately
- **Components**: Test UI behavior with mocked dependencies
- **Context**: Test state management logic

## 🔄 Migration Notes

### What Changed:
1. **Pages moved** from `src/pages/` to `src/components/pages/`
2. **API calls extracted** to dedicated service layer
3. **State management** moved to custom hooks
4. **Product selection** managed through React Context
5. **Improved error handling** throughout the application

### Import Updates:
- Components: Use centralized exports from `components/index.ts`
- Services: Import directly from specific service files (e.g., `services/productService`)
- Hooks: Import directly from specific hook files (e.g., `hooks/useProducts`)
- Context: Import directly from context files (e.g., `context/ProductContext`)

## 🎯 Future Enhancements

The new architecture supports easy implementation of:
- Shopping cart functionality
- User authentication
- Product search and filtering
- Product categories
- Checkout process
- Order history
- Theme switching
- Product details modal/page ✅ (ProductContext ready)
- Internationalization (i18n)

This architecture provides a solid foundation for scaling the TeaShop application while maintaining code quality and developer experience.