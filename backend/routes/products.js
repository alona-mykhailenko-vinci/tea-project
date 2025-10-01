const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products');

console.log('� ROUTES: Products router loaded successfully');

// GET /api/products - Get all products
router.get('/products', (req, res) => {
  try {
    console.log('� BACKEND: GET /api/products - Request received');
    console.log('� BACKEND: Query parameters:', req.query);
    
    const { search, minPrice, maxPrice, lowStock } = req.query;
    
    let products;

    if (search) {
      console.log('� BACKEND: Searching products with query:', search);
      products = ProductsService.searchProducts(search);
    } else if (minPrice && maxPrice) {
      console.log('� BACKEND: Filtering by price range:', minPrice, 'to', maxPrice);
      products = ProductsService.filterByPriceRange(minPrice, maxPrice);
    } else if (lowStock) {
      const threshold = parseInt(lowStock) || 10;
      console.log('� BACKEND: Getting low stock products with threshold:', threshold);
      products = ProductsService.getLowStockProducts(threshold);
    } else {
      console.log('� BACKEND: Getting all products');
      products = ProductsService.getAllProducts();
    }

    console.log('🟨 BACKEND: Products retrieved:', products.length, 'items');
    console.log('� BACKEND: First product (if any):', products[0] || 'No products found');

    const response = {
      success: true,
      data: products,
      count: products.length
    };
    
    console.log('� BACKEND: Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('🟨 BACKEND ERROR: Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const product = ProductsService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/products - Create new product
router.post('/products', (req, res) => {
  try {
    const { name, description, price, unity, stock_quantity, image_url } = req.body;

    // Validate required fields
    if (!name || !description || !price || !unity || stock_quantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, description, price, unity, stock_quantity'
      });
    }

    // Validate data types
    if (isNaN(price) || isNaN(stock_quantity)) {
      return res.status(400).json({
        success: false,
        error: 'Price and stock_quantity must be numbers'
      });
    }

    const newProduct = ProductsService.createProduct({
      name,
      description,
      price,
      unity,
      stock_quantity,
      image_url
    });

    if (!newProduct) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create product'
      });
    }

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /api/products/:id - Update product
router.put('/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, unity, stock_quantity, image_url } = req.body;

    // Check if product exists
    const existingProduct = ProductsService.getProductById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Validate data types if provided
    if (price !== undefined && isNaN(price)) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a number'
      });
    }

    if (stock_quantity !== undefined && isNaN(stock_quantity)) {
      return res.status(400).json({
        success: false,
        error: 'Stock quantity must be a number'
      });
    }

    const updatedProduct = ProductsService.updateProduct(productId, {
      name,
      description,
      price,
      unity,
      stock_quantity,
      image_url
    });

    if (!updatedProduct) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update product'
      });
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/products/:id', (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = ProductsService.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PATCH /api/products/:id/stock - Update stock quantity only
router.patch('/products/:id/stock', (req, res) => {
  try {
    const productId = req.params.id;
    const { stock_quantity } = req.body;

    if (stock_quantity === undefined || isNaN(stock_quantity)) {
      return res.status(400).json({
        success: false,
        error: 'Valid stock_quantity is required'
      });
    }

    const updatedProduct = ProductsService.updateProduct(productId, {
      stock_quantity
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: 'Stock quantity updated successfully'
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;