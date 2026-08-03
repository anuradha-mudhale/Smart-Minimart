const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

const authMiddleware = require('../middleware/auth.middleware');

// add
router.post('/add', authMiddleware, cartController.addToCart);

// get
router.get('/', authMiddleware, cartController.getCart);
router.put(
    '/update/:id',
    authMiddleware,
    cartController.updateQuantity
);


// delete
router.delete('/:id', authMiddleware, cartController.removeFromCart);
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;