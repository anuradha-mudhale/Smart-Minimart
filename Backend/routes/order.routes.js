const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// admin = role_id = 1
router.put('/status/:id',
    authMiddleware,
    roleMiddleware(1),
    orderController.updateOrderStatus
);

router.post('/checkout', authMiddleware, orderController.checkout);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.put('/cancel/:id', authMiddleware, orderController.cancelOrder);

router.get(
    '/admin/all',
    authMiddleware,
    roleMiddleware(1),
    orderController.getAllOrders
);

module.exports = router;