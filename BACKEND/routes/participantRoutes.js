const express = require("express");
const Participant = require("../models/participantModel");

const participantRouter = express.Router();

// Add a new participant
participantRouter.post("/participant", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    Participant.create(username, password, (err, result) => {
        if (err) {
            console.error("Error inserting participant:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Participant added successfully" });
    });
});

// Get all participants
participantRouter.get("/participants", (req, res) => {
    Participant.getAll((err, results) => {
        if (err) {
            console.error("Error fetching participants:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// ✅ Correct export with unique name
module.exports = participantRouter;
