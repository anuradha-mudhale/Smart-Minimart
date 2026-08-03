const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    // Authorization header
    const authHeader = req.headers["authorization"];

    // Token check
    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided ❌"
        });
    }

    try {

        // Bearer TOKEN
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user details
        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token ❌"
        });

    }

};