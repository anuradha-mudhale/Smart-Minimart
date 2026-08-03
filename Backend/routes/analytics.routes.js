const express = require('express');
const router = express.Router();

const analyticsController = require('../controllers/analytics.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// admin only
router.get('/summary', authMiddleware, roleMiddleware(1), analyticsController.getSalesSummary);

router.get('/top-products', authMiddleware, roleMiddleware(1), analyticsController.getTopProducts);

router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware(1),
    analyticsController.getDashboardStats
);
module.exports = router;