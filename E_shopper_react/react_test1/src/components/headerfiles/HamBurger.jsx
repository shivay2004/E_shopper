import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/HamburgerMenu.module.css";
import { useAuth } from "../../context/AuthContext";

export default function HamburgerMenu({ open }) {
  const { user, login, register, logout } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(loginEmail);
    if (!success) {
      setLoginError("No user found with that email.");
    } else {
      setShowLogin(false);
      setLoginEmail("");
      setLoginError("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(registerForm.name, registerForm.email);
    setShowRegister(false);
    setRegisterForm({ name: "", email: "" });
  };

  return (
    <header>
      <div className={`${styles.dropdown} ${open ? styles.show : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/details">Shop Detail</Link>
          </li>
          <li className={styles.hamPages}>
            Pages <i className="fa-solid fa-chevron-down"></i>
            <div>
              <ul>
                <li>
                  <Link to="/cart">Shopping Cart</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {user ? (
            <>
              <li className={styles.welcome}>Hi, {user.name}</li>
              <li>
                <button className={styles.navBtn} onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className={styles.navBtn}
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className={styles.navBtn}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className={styles.modalBackdrop}>
          <form className={styles.authModal} onSubmit={handleLogin}>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Your Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            {loginError && <p className={styles.error}>{loginError}</p>}
            <div className={styles.authActions}>
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowLogin(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className={styles.modalBackdrop}>
          <form className={styles.authModal} onSubmit={handleRegister}>
            <h3>Register</h3>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
            />
            <div className={styles.authActions}>
              <button type="submit">Register</button>
              <button type="button" onClick={() => setShowRegister(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
