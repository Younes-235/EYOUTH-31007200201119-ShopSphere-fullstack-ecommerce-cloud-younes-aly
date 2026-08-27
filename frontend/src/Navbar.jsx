import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brandZone}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛍️</span>
          <span className={styles.logoText}>ShopSphere</span>
        </Link>
      </div>

      <div className={styles.linksZone}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/products" className={styles.navLink}>Products</Link>
        
        {user && (
          <>
            <Link to="/cart" className={styles.navLink}>Cart</Link>
            <Link to="/profile" className={styles.navLink}>Profile</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className={styles.adminLink}>Admin Panel</Link>
            <Link to="/admin/logs" className={styles.adminLink}>Activity Logs</Link>
          </>
        )}
      </div>

      <div className={styles.authZone}>
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className={styles.themeBtn}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <div className={styles.userStatus}>
            <span className={styles.welcomeText}>
              <strong>{user.email}</strong>
            </span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.guestButtons}>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/register" className={styles.registerButton}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}