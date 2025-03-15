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
                setError("Failed to fetch scores. Showing sample data.");
                
                // Set sample data in case of an error
                setParticipants([
                    { participant_id: "P001", total_score: 95, quizzes_attempted: 5 },
                    { participant_id: "P002", total_score: 87, quizzes_attempted: 6 },
                    { participant_id: "P003", total_score: 78, quizzes_attempted: 4 },
                    { participant_id: "P004", total_score: 70, quizzes_attempted: 3 },
                    { participant_id: "P005", total_score: 60, quizzes_attempted: 5 },
                ]);
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
