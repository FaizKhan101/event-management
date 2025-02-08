// frontend/src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "#fff" }}>
            <h2>Event Management</h2>
            <div>
                <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
                {token && <Link to="/dashboard" style={{ color: "#fff", marginRight: "10px" }}>Dashboard</Link>}
                {token && <Link to="/create-event" style={{ color: "#fff", marginRight: "10px" }}>Create Event</Link>}
                {token ? (
                    <button onClick={handleLogout} style={{ color: "#fff", background: "red", border: "none", padding: "5px 10px" }}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>
                        <Link to="/register" style={{ color: "#fff" }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
