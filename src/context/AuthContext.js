
import React, { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/action";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find(
      (u) => u.email === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered!",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email: normalizedEmail,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    // Clear previous user's cart
    dispatch(clearCart());

    setUser(loggedInUser);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedInUser)
    );

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const normalizedEmail = email.toLowerCase();

    const foundUser = users.find(
      (u) =>
        u.email === normalizedEmail &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    // Clear previous cart on every successful login
    dispatch(clearCart());

    setUser(loggedInUser);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedInUser)
    );

    return { success: true };
  };

  const logout = () => {
    // Clear cart when user logs out
    dispatch(clearCart());

    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
