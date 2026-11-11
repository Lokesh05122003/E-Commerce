
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      return setError("Password must contain at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }

    const result = register(
      form.name.trim(),
      form.email.trim(),
      form.password
    );

    if (!result.success) {
      return setError(result.message);
    }

    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto p-4" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password (minimum 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button className="btn btn-dark w-100" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
