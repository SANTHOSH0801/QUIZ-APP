const express = require("express");
const router = express.Router();
const connection = require("../dbConnection"); // Ensure the path is correct

// GET route to fetch all leaderboard data
router.get("/leaderboard", (req, res) => {
    const sql = "SELECT * FROM leaderboard"; // Update table name if necessary

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("🔥 Error executing query:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        console.log("📊 Leaderboard Data Fetched:", results);
        res.json({ success: true, data: results });
    });
});

// Export the router
module.exports = router;
