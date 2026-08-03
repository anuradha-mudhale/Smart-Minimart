const express = require('express');
const router = express.Router();

const recommendationController = require('../controllers/recommendation.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, recommendationController.getRecommendations);


module.exports = router;