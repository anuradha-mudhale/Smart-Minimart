const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlist.controller");
const authMiddleware = require("../middleware/auth.middleware");

// ➕ Add to wishlist
router.post("/add", authMiddleware, wishlistController.addToWishlist);

// 📥 Get wishlist
router.get("/", authMiddleware, wishlistController.getWishlist);

// ❌ Remove from wishlist
router.delete("/remove/:product_id", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;