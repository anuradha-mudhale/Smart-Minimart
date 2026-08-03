const express = require("express");
const router = express.Router();

const userController =
    require("../controllers/user.controller");

const authMiddleware =
    require("../middleware/auth.middleware");

const roleMiddleware =
    require("../middleware/role.middleware");


// GET ALL USERS
router.get(
    "/",
    authMiddleware,
    roleMiddleware(1),
    userController.getAllUsers
);


// DEACTIVATE USER
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(1),
    userController.deleteUser
);

module.exports = router;