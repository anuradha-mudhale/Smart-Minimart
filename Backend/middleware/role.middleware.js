module.exports = (requiredRole) => {

    return (req, res, next) => {

        // user role check करतो
        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                message: "Access denied ❌ (Admin only)"
            });
        }

        next();
    };
};