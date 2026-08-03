const express = require('express');
const router = express.Router();

const recentController = require('../controllers/recent.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get recently viewed
router.get('/', authMiddleware, recentController.getRecent);

// Add recently viewed
router.post('/add', authMiddleware, recentController.addView);

module.exports = router;