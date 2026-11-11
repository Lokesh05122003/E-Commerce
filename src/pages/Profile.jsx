
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="container text-center py-5">
        <h3>Please Login First</h3>
        <Link to="/login" className="btn btn-dark mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "550px" }}
      >
        <div className="text-center">
          <div
            className="rounded-circle bg-dark text-white mx-auto d-flex align-items-center justify-content-center"
            style={{
              width: "90px",
              height: "90px",
              fontSize: "35px"
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-3">{user.name}</h3>
          <p className="text-muted">My Account</p>
        </div>

        <hr />

        <h5>Profile Information</h5>

        <div className="mt-3">
          <p><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account ID:</strong> {user.id}</p>
        </div>

        <div className="d-grid gap-2 mt-3">
          <Link to="/cart" className="btn btn-outline-dark">
            <i className="fa fa-shopping-cart me-2"></i>
            My Shopping Cart
          </Link>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
