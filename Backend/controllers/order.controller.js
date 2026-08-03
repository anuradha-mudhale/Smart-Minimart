const db = require('../config/db');

// ================= CHECKOUT =================
exports.checkout = (req, res) => {

    const user_id = req.user.id;
    const { payment_method, coupon_id } = req.body;

    // 1️⃣ Get cart items
    const cartSql = `
        SELECT ci.product_id, ci.quantity, p.price
        FROM cart c
        JOIN cart_items ci ON c.id = ci.cart_id
        JOIN products p ON ci.product_id = p.id
        WHERE c.user_id = ?
    `;

    db.query(cartSql, [user_id], (err, items) => {

        if (err) return res.status(500).json(err);

        if (items.length === 0) {
            return res.status(400).json({ message: "Cart is empty ❌" });
        }

        // 2️⃣ Calculate total
        let total = 0;
        items.forEach(item => {
            total += item.price * item.quantity;
        });

        // 3️⃣ Apply coupon (optional)
        if (coupon_id) {
            // basic flat 10% discount (later DB based करू)
            total = total * 0.9;
        }

        // 4️⃣ Create order
        const orderSql = `
            INSERT INTO orders (user_id, total_amount, payment_method, coupon_id)
            VALUES (?, ?, ?, ?)
        `;

        db.query(orderSql, [user_id, total, payment_method, coupon_id || null], (err, orderResult) => {

            if (err) return res.status(500).json(err);

            const order_id = orderResult.insertId;

            // 5️⃣ Insert order items
            const values = items.map(item => [
                order_id,
                item.product_id,
                item.quantity,
                item.price
            ]);

            const orderItemsSql = `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ?
            `;

            db.query(orderItemsSql, [values], (err) => {

                if (err) return res.status(500).json(err);

                // 6️⃣ Clear cart
                const clearSql = `
                    DELETE ci FROM cart_items ci
                    JOIN cart c ON ci.cart_id = c.id
                    WHERE c.user_id = ?
                `;

                db.query(clearSql, [user_id], (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        message: "Order placed successfully 🎉",
                        order_id,
                        total,
                        payment_method
                    });
                });
            });
        });
    });
};

// ================= ORDER HISTORY =================
exports.getMyOrders = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT 
            o.id AS order_id,
            o.total_amount,
            o.status,
            o.payment_method,
            o.created_at,
            p.name,
            oi.quantity,
            oi.price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

// ================= UPDATE ORDER STATUS (ADMIN) =================
exports.updateOrderStatus = (req, res) => {

    const { id } = req.params; // order id
    const { status } = req.body;

    // allowed status
    const validStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

    // ❌ invalid status
    if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status ❌" });
    }

    const sql = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(sql, [status, id], (err, result) => {

        if (err) return res.status(500).json(err);

        // ❌ order not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found ❌" });
        }

        res.json({ message: "Order status updated ✅" });
    });
};

// ================= CANCEL ORDER =================
exports.cancelOrder = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;

    // check order
    const checkSql = `
        SELECT status FROM orders
        WHERE id = ? AND user_id = ?
    `;

    db.query(checkSql, [id, user_id], (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Order not found ❌" });
        }

        const currentStatus = result[0].status;

        // ❌ already delivered
        if (currentStatus === "DELIVERED") {
            return res.status(400).json({ message: "Cannot cancel delivered order ❌" });
        }

        // update status
        const updateSql = `
            UPDATE orders SET status = 'CANCELLED'
            WHERE id = ?
        `;

        db.query(updateSql, [id], (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Order cancelled successfully ❌" });
        });
    });
};
// ================= GET ALL ORDERS (ADMIN) =================
exports.getAllOrders = (req, res) => {

    const sql = `
        SELECT
            o.id,
            u.name,
            u.email,
            o.total_amount,
            o.status,
            o.payment_method,
            o.created_at
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};