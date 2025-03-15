const pool = require("../dbConnection");

const getLeaderboard = async () => {
    try {
        console.log("Running getLeaderboard...");

        const query = `
            SELECT participant_id, total_score, quizzes_attempted
            FROM leaderboard
            ORDER BY total_score DESC
        `;
        
        // Test if the database connection is working
        const testQuery = 'SELECT 1 + 1 AS result';  // Test query
        const [testResult] = await pool.execute(testQuery);
        console.log("Test query result:", testResult);  // Should return [{ result: 2 }]
        
        // Execute the main query
        const result = await pool.execute(query);
        console.log("Query Result:", JSON.stringify(result, null, 2));  // Log the full result
        
        if (!result || result.length === 0) {
            console.log("No result returned from the query.");
            return [];
        }

        const [rows, fields] = result;  // Destructure the result

        console.log("Rows:", JSON.stringify(rows, null, 2));  // Log rows for inspection
        console.log("Fields:", JSON.stringify(fields, null, 2));  // Log fields for inspection

        if (!rows || rows.length === 0) {
            console.log("No leaderboard data found.");
            return [];  // Return an empty array if no data is found
        }

        return rows;  // Return the leaderboard data
    } catch (err) {
        console.error("❌ Error fetching leaderboard:", err);
        throw new Error("Database error while fetching leaderboard.");
    }
};

module.exports = {
    getLeaderboard
};
