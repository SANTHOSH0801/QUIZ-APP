import { useState } from "react";
import axios from "axios";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // ✅ Redirect immediately after submitting
        navigate("/scoreboard");

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", {
                username,
                password
            });

            console.log("✅ Login Success:", response.data);
        } catch (error) {
            console.error("❌ Login Error:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login Admin</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Admin;
