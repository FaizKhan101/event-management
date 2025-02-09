// frontend/src/pages/Login.js
import { useState } from "react";
import { guestLogin } from "../api";
import { useNavigate } from "react-router-dom";

function GuestLogin() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await guestLogin({email});
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Guest Login</h2>
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
        <button type="submit">Login</button>
      </p>
    </form>
  );
}

export default GuestLogin;
