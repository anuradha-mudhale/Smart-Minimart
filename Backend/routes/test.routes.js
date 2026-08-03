const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// ✅ normal protected route
router.get('/user', authMiddleware, (req, res) => {
    res.json({
        message: "User route working ✅",
        user: req.user
    });
});

// ✅ admin only route
router.get('/admin',
    authMiddleware,
    roleMiddleware(1), // 1 = ADMIN
    (req, res) => {
        res.json({
            message: "Admin route working ✅"
        });
    }
);

module.exports = router;