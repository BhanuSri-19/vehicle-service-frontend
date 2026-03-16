import { Link, useNavigate } from "react-router-dom";

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
}
