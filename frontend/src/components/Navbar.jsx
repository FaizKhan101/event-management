// frontend/src/components/Navbar.js
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/events-logo.png";
import classes from "./NavBar.module.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={classes.mainHeader}>
      <Link to="/" className={classes.title}>
        <img src={logo} alt="Page logo" />
        <h1>EMW</h1>
      </Link>

      <nav>
        <ul className={classes.navList}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Home</NavLink>
          </li>
          <li>{token && <NavLink to="/guest-login" className={({isActive}) => isActive ? classes.active : undefined}>Guest Login</NavLink>}</li>
          <li>{token && <NavLink to="/dashboard" className={({isActive}) => isActive ? classes.active : undefined}>Dashboard</NavLink>}</li>
          <li>{token && <NavLink to="/create-event" className={({isActive}) => isActive ? classes.active : undefined}>Create Event</NavLink>}</li>
          <li>
            {token ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <div className={classes.auth}>
                <NavLink to="/login" className={({isActive}) => isActive ? classes.active : undefined}>Login</NavLink>
                <NavLink to="/register" className={({isActive}) => isActive ? classes.active : undefined}>Register</NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
