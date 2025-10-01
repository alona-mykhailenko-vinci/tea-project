const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE_PATH = path.join(__dirname, '../data/products.json');

// Log file path on startup
console.log('� SERVICE: ProductsService initialized with file path:', PRODUCTS_FILE_PATH);
console.log('� SERVICE: File exists:', fs.existsSync(PRODUCTS_FILE_PATH));

class ProductsService {
  // Read products from JSON file
  static getProducts() {
    try {
      console.log('� SERVICE: Reading products from file:', PRODUCTS_FILE_PATH);
      const data = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
      console.log('� SERVICE: Raw file data length:', data.length, 'characters');
      const products = JSON.parse(data);
      console.log('🟩 SERVICE: Parsed products:', products.length, 'items');
      return products;
    } catch (error) {
      console.error('🟩 SERVICE ERROR: Error reading products file:', error);
      console.error('🟩 SERVICE ERROR: File path attempted:', PRODUCTS_FILE_PATH);
      return [];
    }
  }

  // Write products to JSON file
  static saveProducts(products) {
    try {
      fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing products file:', error);
      return false;
    }
  }

  // Get all products
  static getAllProducts() {
    return this.getProducts();
  }

  // Get product by ID
  static getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id_product === parseInt(id));
  }

  // Create new product
  static createProduct(productData) {
    const products = this.getProducts();
    
    // Generate new ID (find max ID and add 1)
    const maxId = products.reduce((max, product) => 
      product.id_product > max ? product.id_product : max, 0);
    
    const newProduct = {
      id_product: maxId + 1,
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      unity: productData.unity,
      stock_quantity: parseInt(productData.stock_quantity),
      image_url: productData.image_url || ''
    };

    products.push(newProduct);
    
    if (this.saveProducts(products)) {
      return newProduct;
    }
    return null;
  }

  // Update product
  static updateProduct(id, productData) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id_product === parseInt(id));
    
    if (productIndex === -1) {
      return null;
    }

    // Update product with new data
    products[productIndex] = {
      ...products[productIndex],
      name: productData.name || products[productIndex].name,
      description: productData.description || products[productIndex].description,
      price: productData.price ? parseFloat(productData.price) : products[productIndex].price,
      unity: productData.unity || products[productIndex].unity,
      stock_quantity: productData.stock_quantity ? parseInt(productData.stock_quantity) : products[productIndex].stock_quantity,
      image_url: productData.image_url !== undefined ? productData.image_url : products[productIndex].image_url
    };

    if (this.saveProducts(products)) {
      return products[productIndex];
    }
    return null;
  }

  // Delete product
  static deleteProduct(id) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id_product === parseInt(id));
    
    if (productIndex === -1) {
      return false;
    }

    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    
    if (this.saveProducts(products)) {
      return deletedProduct;
    }
    return false;
  }

  // Search products by name or description
  static searchProducts(query) {
    const products = this.getProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Filter products by price range
  static filterByPriceRange(minPrice, maxPrice) {
    const products = this.getProducts();
    return products.filter(product => 
      product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
    );
  }

  // Get products with low stock (less than specified quantity)
  static getLowStockProducts(threshold = 10) {
    const products = this.getProducts();
    return products.filter(product => product.stock_quantity < threshold);
  }
}

module.exports = ProductsService;