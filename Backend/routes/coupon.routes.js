const express = require("express");
const router = express.Router();

const couponController = require("../controllers/coupon.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// ================= GET ALL COUPONS =================
router.get(
    "/",
    authMiddleware,
    roleMiddleware(1),
    couponController.getAllCoupons
);

// ================= ADD COUPON =================
router.post(
    "/",
    authMiddleware,
    roleMiddleware(1),
    couponController.addCoupon
);

// ================= DELETE COUPON =================
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(1),
    couponController.deleteCoupon
);

module.exports = router;