const db = require("../config/db");

// ================= GET ALL USERS =================
exports.getAllUsers = (req, res) => {

    const sql = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.is_active,
            r.name AS role
        FROM users u
        JOIN roles r
        ON u.role_id = r.id
        ORDER BY u.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


// ================= DEACTIVATE USER =================
exports.deleteUser = (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE users
        SET is_active = FALSE
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({
            message: "User deactivated successfully ✅"
        });
    });
};