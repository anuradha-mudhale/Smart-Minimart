const db = require('../config/db');

// ➕ ADD TO WISHLIST
exports.addToWishlist = (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: "product_id is required" });
    }

    const sql = `
        INSERT INTO wishlist (user_id, product_id)
        VALUES (?, ?)
    `;

    db.query(sql, [user_id, product_id], (err) => {
        if (err) {
            // duplicate entry handle
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Already in wishlist ❤️" });
            }
            return res.status(500).json(err);
        }

        res.json({ message: "Added to wishlist ❤️" });
    });
};


// 📥 GET WISHLIST
exports.getWishlist = (req, res) => {
    const user_id = req.user.id;

    const sql = `
         SELECT p.id, p.name, p.price, p.image_url
            FROM wishlist w
            JOIN products p ON w.product_id = p.id
            WHERE w.user_id = ?
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};


// ❌ REMOVE FROM WISHLIST
exports.removeFromWishlist = (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.params;

    const sql = `
        DELETE FROM wishlist
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(sql, [user_id, product_id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Removed from wishlist ❌" });
    });
};