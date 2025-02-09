// frontend/src/pages/Login.js
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
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
      <div style={{ textAlign: "center" }}>
      <button
        onClick={handleGuestLogin}
        style={{
          marginTop: "10px",
          background: "gray",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
        }}
      >
        Continue as Guest
      </button>
      </div>
    </div>
  );
}

export default Login;
