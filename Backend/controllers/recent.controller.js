const db = require('../config/db');

// GET RECENTLY VIEWED
exports.getRecent = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT * FROM recently_viewed
        WHERE user_id = ?
        ORDER BY viewed_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};

// ADD VIEW
exports.addView = (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: "product_id required" });
    }

    const sql = `
        INSERT INTO recently_viewed (user_id, product_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE viewed_at = CURRENT_TIMESTAMP
    `;

    db.query(sql, [user_id, product_id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "View saved successfully 👀" });
    });
};