// frontend/src/pages/Login.js
import { useState } from "react";
import { loginUser } from "../api";
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

  return (
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
  );
}

export default Login;
