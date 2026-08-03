const db = require("../config/db");

// ================= GET ALL COUPONS =================
exports.getAllCoupons = (req, res) => {

    const sql = `
        SELECT *
        FROM coupons
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


// ================= ADD COUPON =================
exports.addCoupon = (req, res) => {

    const {
        code,
        discount_type,
        discount_value,
        expiry_date,
        min_order_value
    } = req.body;

    const sql = `
        INSERT INTO coupons
        (
            code,
            discount_type,
            discount_value,
            expiry_date,
            min_order_value
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            code,
            discount_type,
            discount_value,
            expiry_date,
            min_order_value
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Coupon created successfully ✅"
            });
        }
    );
};


// ================= DELETE COUPON =================
exports.deleteCoupon = (req, res) => {

    const { id } = req.params;

    const sql =
        "DELETE FROM coupons WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Coupon deleted successfully ✅"
        });
    });
};