const db = require('../config/db');

// ================= ADD PRODUCT (Admin only) =================
exports.addProduct = (req, res) => {
    const { name, description, price, stock, category_id, image_url } = req.body;

    // Validation
    if (!name || price == null || stock == null) {
        return res.status(400).json({
            message: 'Required fields missing ❌'
        });
    }

    const sql = `
        INSERT INTO products
        (name, description, price, stock, category_id, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, description, price, stock, category_id, image_url],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product added successfully ✅',
                product_id: result.insertId
            });
        }
    );
};

// ================= GET ALL PRODUCTS =================
exports.getProducts = (req, res) => {
    const sql = `
        SELECT *
    FROM products
    WHERE is_active = TRUE
    ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// ================= SEARCH PRODUCTS =================
exports.searchProducts = (req, res) => {
    const { keyword = "" } = req.query;

    const sql = `
        SELECT *
        FROM products
        WHERE is_active = TRUE
        AND name LIKE ?
        ORDER BY id DESC
    `;

    db.query(sql, [`%${keyword}%`], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// ================= FILTER PRODUCTS =================
exports.filterProducts = (req, res) => {
    const { category_id } = req.query;

    const sql = `
        SELECT *
        FROM products
        WHERE category_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [category_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// ================= LOW STOCK PRODUCTS =================
exports.getLowStockProducts = (req, res) => {
    const sql = `
        SELECT *
        FROM products
        WHERE stock < 10
        ORDER BY stock ASC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// ================= GET SINGLE PRODUCT =================
exports.getSingleProduct = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM products
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Product not found ❌'
            });
        }

        // Single object return
        res.json(result[0]);
    });
};
// ================= DELETE PRODUCT =================
exports.deleteProduct = (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE products
        SET is_active = FALSE
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Product deleted successfully ✅"
        });

    });

};

// ================= UPDATE PRODUCT =================

exports.updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        price,
        stock,
        category_id,
        image_url
    } = req.body;

    const sql = `
        UPDATE products
        SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        category_id = ?,
        image_url = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            description,
            price,
            stock,
            category_id,
            image_url,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                    "Product updated successfully ✅"
            });

        }
    );
};