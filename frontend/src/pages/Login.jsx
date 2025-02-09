import { useState } from "react";
import { guestUser, loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    const handleGuestLogin = async () => {
        try {
            const { data } = await guestUser();
            localStorage.setItem("token", data.token);
            alert("Logged in as Guest!");
            navigate("/");
        } catch (error) {
            alert("Guest login failed.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGuestLogin} style={{ marginTop: "10px", background: "gray", color: "#fff", border: "none", padding: "5px 10px" }}>
                Continue as Guest
            </button>
        </div>
    );
}

export default Login;
