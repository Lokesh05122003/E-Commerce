
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      return { success: false, message: "Email already registered!" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      })
    );

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u) =>
        u.email === email.toLowerCase() &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password!"
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedInUser)
    );

    return { success: true };
  };

  const logout = () => {
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
