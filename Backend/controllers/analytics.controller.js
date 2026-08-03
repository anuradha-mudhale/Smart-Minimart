const db = require('../config/db');

// ================= SALES SUMMARY =================
exports.getSalesSummary = (req, res) => {

    const sql = `
        SELECT 
            COUNT(DISTINCT o.id) AS total_orders,
            SUM(o.total_amount) AS total_revenue
        FROM orders o
    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result[0]);
    });
};


// ================= TOP PRODUCTS =================
exports.getTopProducts = (req, res) => {

    const sql = `
        SELECT 
            p.name,
            SUM(oi.quantity) AS total_sold
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY oi.product_id
        ORDER BY total_sold DESC
        LIMIT 5
    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};
// ================= DASHBOARD =================
exports.getDashboardStats = (req, res) => {

    const sql = `
        SELECT

        (SELECT COUNT(*) FROM orders) AS total_orders,

        (SELECT COUNT(*) FROM orders
         WHERE status='PENDING') AS pending_orders,

        (SELECT COUNT(*) FROM orders
         WHERE status='DELIVERED') AS delivered_orders,

        (SELECT COUNT(*) FROM orders
         WHERE status='CANCELLED') AS cancelled_orders,

        (SELECT IFNULL(SUM(total_amount),0)
         FROM orders) AS total_revenue,

        (SELECT COUNT(*) FROM products) AS total_products,

        (SELECT COUNT(*) FROM users
         WHERE role_id = 2) AS total_customers
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};