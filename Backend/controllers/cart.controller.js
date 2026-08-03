const db = require('../config/db');

// ================= ADD TO CART =================
const addToCart = (req, res) => {

    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    const cartSql = "SELECT * FROM cart WHERE user_id = ?";

    db.query(cartSql, [user_id], (err, cartResult) => {

        if (err) return res.status(500).json(err);

        if (cartResult.length === 0) {

            const createCart = "INSERT INTO cart (user_id) VALUES (?)";

            db.query(createCart, [user_id], (err, newCart) => {

                if (err) return res.status(500).json(err);

                const cart_id = newCart.insertId;
                insertCartItem(cart_id);
            });

        } else {
            const cart_id = cartResult[0].id;
            insertCartItem(cart_id);
        }
    });

    function insertCartItem(cart_id) {

        const checkItem = `
            SELECT * FROM cart_items
            WHERE cart_id = ? AND product_id = ?
        `;

        db.query(checkItem, [cart_id, product_id], (err, itemResult) => {

            if (err) return res.status(500).json(err);

            if (itemResult.length > 0) {

                const updateSql = `
                    UPDATE cart_items
                    SET quantity = quantity + ?
                    WHERE cart_id = ? AND product_id = ?
                `;

                db.query(updateSql, [quantity, cart_id, product_id], (err) => {
                    if (err) return res.status(500).json(err);

                    res.json({ message: "Cart updated ✅" });
                });

            } else {

                const insertSql = `
                    INSERT INTO cart_items (cart_id, product_id, quantity)
                    VALUES (?, ?, ?)
                `;

                db.query(insertSql, [cart_id, product_id, quantity], (err) => {
                    if (err) return res.status(500).json(err);

                    res.json({ message: "Added to cart ✅" });
                });
            }
        });
    }
};


// ================= GET CART =================
const getCart = (req, res) => {

    const user_id = req.user.id;

    const sql = `
       SELECT
    ci.id AS cart_item_id,
    c.id AS cart_id,
    p.name,
    p.price,
    p.image_url,
    ci.quantity,
    (p.price * ci.quantity) AS total
FROM cart c
JOIN cart_items ci ON c.id = ci.cart_id
JOIN products p ON ci.product_id = p.id
WHERE c.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    });
};


// ================= REMOVE ITEM =================
const removeFromCart = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;

    // 🔍 Step 1: item check (with user validation)
    const checkSql = `
        SELECT ci.id
        FROM cart_items ci
        JOIN cart c ON ci.cart_id = c.id
        WHERE ci.id = ? AND c.user_id = ?
    `;

    db.query(checkSql, [id, user_id], (err, result) => {

        if (err) return res.status(500).json(err);

        // ❌ item नाही / दुसऱ्याचा आहे
        if (result.length === 0) {
            return res.status(404).json({ message: "Item not found ❌" });
        }

        // ✅ delete
        const deleteSql = "DELETE FROM cart_items WHERE id = ?";

        db.query(deleteSql, [id], (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Item removed successfully ✅" });
        });
    });
};

// ================= CLEAR CART =================
const clearCart = (req, res) => {

    const user_id = req.user.id;

    // 🔍 Step 1: user चा cart शोध
    const getCartSql = "SELECT id FROM cart WHERE user_id = ?";

    db.query(getCartSql, [user_id], (err, cartResult) => {

        if (err) return res.status(500).json(err);

        // ❌ cart नाही
        if (cartResult.length === 0) {
            return res.status(404).json({ message: "Cart not found ❌" });
        }

        const cart_id = cartResult[0].id;

        // 🧹 Step 2: cart_items delete कर
        const deleteSql = "DELETE FROM cart_items WHERE cart_id = ?";

        db.query(deleteSql, [cart_id], (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Cart cleared successfully 🧹" });
        });
    });
};

const updateQuantity = (req, res) => {

    const { id } = req.params;

    const { quantity } = req.body;

    const sql = `
        UPDATE cart_items
        SET quantity = ?
        WHERE id = ?
    `;

    db.query(sql, [quantity, id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({
            message: "Quantity updated ✅"
        });
    });
};

// ✅ IMPORTANT EXPORT
module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
    updateQuantity
};