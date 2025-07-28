import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/dashboard">Pokemon App</Link>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/pokemon">Pokemon</Link>
        <Link to="/pokemon/create">Add Pokemon</Link>
      </div>

      <div className="nav-user">
        <span>Welcome, {user?.username || user?.email}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
