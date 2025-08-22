import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const register = (name, email) => {
    const users = getUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) {
      alert("User with this email already exists.");
      return false;
    }
    const newUser = { name, email };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    return true;
  };

  const login = (email) => {
    const users = getUsers();
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
