const express = require("express");
const router = express.Router();
const connection = require("../dbConnection"); // Ensure this path is correct

router.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const sql = "SELECT * FROM admins WHERE username = ?";
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error("🔥 Database error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        if (results.length === 0) {
            console.log("❌ Invalid Username!");
            return res.status(401).json({ success: false, message: "Invalid username or password" }); 
        }

        const storedPassword = results[0].password;

        if (storedPassword === password) {
            console.log("✅ Login Successful!");
            return res.json({ success: true, message: "Login successful" });
        } else {
            console.log("❌ Incorrect Password!");
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    });
});



// Export the router

module.exports = router;
