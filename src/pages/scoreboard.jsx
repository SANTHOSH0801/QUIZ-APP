import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Scoreboard.css";

const Scoreboard = () => {
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/leaderboard");

                // Process Data: Merge duplicate participant IDs
                const mergedData = response.data.data.reduce((acc, curr) => {
                    const existing = acc.find(p => p.participant_id === curr.participant_id);
                    if (existing) {
                        existing.total_score += curr.total_score;
                        existing.quizzes_attempted += curr.quizzes_attempted;
                    } else {
                        acc.push({ ...curr });
                    }
                    return acc;
                }, []);

                // Sort by total_score (descending order)
                mergedData.sort((a, b) => b.total_score - a.total_score);

                setParticipants(mergedData);
            } catch (error) {
                console.error("❌ Error fetching scores:", error);
                setError("Failed to fetch scores. Try again later.");
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="scoreboard-container">
            <h1>Overall Quiz Scoreboard</h1>
            {error && <p className="error-message">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Participant ID</th>
                        <th>Total Score</th>
                        <th>Quizzes Attempted</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{participant.participant_id}</td>
                            <td>{participant.total_score}</td>
                            <td>{participant.quizzes_attempted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scoreboard;
