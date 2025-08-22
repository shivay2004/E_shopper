import { useState } from "react";
import style from "../../css/Nav1.module.css";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function Nav1() {
  const { user, login, register, logout } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [registerForm, setRegisterForm] = useState({ name: "", email: "" });
  const [loginError, setLoginError] = useState("");

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
    <nav className={style.navbar}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${style.navLink} ${isActive ? style.activeLink : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${style.navLink} ${isActive ? style.activeLink : ""}`
            }
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/details"
            className={({ isActive }) =>
              `${style.navLink} ${isActive ? style.activeLink : ""}`
            }
          >
            Shop Details
          </NavLink>
        </li>
        <li className={style.pagesdrop}>
          <span className={style.navLink}>
            Pages <i className="fa-solid fa-chevron-down" />
          </span>
          <div>
            <ul>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${style.navLink} ${isActive ? style.activeLink : ""}`
                  }
                >
                  Shopping Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/checkout"
                  className={({ isActive }) =>
                    `${style.navLink} ${isActive ? style.activeLink : ""}`
                  }
                >
                  Checkout
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${style.navLink} ${isActive ? style.activeLink : ""}`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div className={style.navAuth}>
        {user ? (
          <>
            <span className={style.welcome}>Hi, {user.name}</span>
            <button className={style.navBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={style.navBtn} onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className={style.navBtn}
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </>
        )}
      </div>

      {showLogin && (
        <div className={style.modalBackdrop}>
          <form className={style.authModal} onSubmit={handleLogin}>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Your Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            {loginError && <p className={style.error}>{loginError}</p>}
            <div className={style.authActions}>
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowLogin(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showRegister && (
        <div className={style.modalBackdrop}>
          <form className={style.authModal} onSubmit={handleRegister}>
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
            <div className={style.authActions}>
              <button type="submit">Register</button>
              <button type="button" onClick={() => setShowRegister(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}
