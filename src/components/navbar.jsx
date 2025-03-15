import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">Quiz App</Link>
            <div className="nav-links">
                <Link to="/admin">Admin</Link>
                <Link to="/login">Login</Link>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
