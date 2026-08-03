const db = require('../config/db');

// ================= RECOMMENDED PRODUCTS =================
exports.getRecommendations = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT p.name, SUM(oi.quantity) as sold
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY oi.product_id
        ORDER BY sold DESC
        LIMIT 5;
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) return res.status(500).json(err);

        // 👉 जर user new असेल (no orders)
        if (result.length === 0) {

            const fallback = `
                SELECT * FROM products
                ORDER BY created_at DESC
                LIMIT 5
            `;

            db.query(fallback, (err, fallbackResult) => {

                if (err) return res.status(500).json(err);

                res.json(fallbackResult);
            });

        } else {
            res.json(result);
        }
    });
};

