/*import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("customerId");

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}>
        🚗 VehicleService
      </div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link className="nav-btn home-btn"  to="/">Home 🏠</Link>
            <Link className="nav-btn login-btn" to="/login">Login 🔑</Link>
            <Link className="nav-btn reg-btn"   to="/register">Register 📝</Link>
          </>
        ) : (
          <>
            <Link className="nav-btn dash-btn"  to="/dashboard">Dashboard 🏠</Link>
            <button className="nav-btn logout-btn" onClick={handleLogout}>Logout 🚪</button>
          </>
        )}
      </div>
    </nav>
  );
}*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleBookClick = (e) => {
    if (!localStorage.getItem("customerId")) {
      e.preventDefault(); // prevent navigation
      alert("⚠ You are not logged in!");
    }
  };

  const handleHistoryClick = (e) => {
    if (!localStorage.getItem("customerId")) {
      e.preventDefault(); // prevent navigation
      alert("⚠ You are not logged in!");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">🚗 Vehicle Service</h2>
      <div className="navbar-links">
        <Link className="nav-btn" to="/">Login 🔑</Link>
        <Link className="nav-btn" to="/register">Register 📝</Link>
        <Link className="nav-btn" to="/book-service" onClick={handleBookClick}>
          Book Service 🛠️
        </Link>
        <Link className="nav-btn" to="/service-history" onClick={handleHistoryClick}>
          Service History 📜
        </Link>
        <Link className="nav-btn" to="/about">About ℹ️</Link>
      </div>
    </nav>
  );
}
