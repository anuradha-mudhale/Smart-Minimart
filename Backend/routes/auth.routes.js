const express = require('express');
const router = express.Router();

// controller import
const authController = require('../controllers/auth.controller');

// register API
router.post('/register', authController.register);

// login API
router.post('/login', authController.login);

module.exports = router;