const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// ================= ADMIN ROUTES =================

// ➕ Add Product (Admin only)
router.post(
    '/add',
    authMiddleware,
    roleMiddleware(1), // ADMIN
    productController.addProduct
);

// 🚨 Low Stock Products (Admin only)
router.get(
    '/low-stock',
    authMiddleware,
    roleMiddleware(1),
    productController.getLowStockProducts
);

// ================= PUBLIC ROUTES =================

// 📦 Get All Products
router.get('/all', productController.getProducts);

// 🔍 Search Products
router.get('/search', productController.searchProducts);

// 🎯 Filter Products
router.get('/filter', productController.filterProducts);

// 📄 Get Single Product Details
// IMPORTANT: Keep this route at the end
router.get('/:id', productController.getSingleProduct);
// Update Product
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(1),
    productController.updateProduct
);

// Delete Product
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(1),
    productController.deleteProduct
);

module.exports = router;