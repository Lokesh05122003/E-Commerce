
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">

                {/* Website Logo */}
                <NavLink
                    className="navbar-brand fw-bold fs-4 px-2"
                    to="/"
                >
                    Shopify
                </NavLink>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler mx-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >

                    {/* Navigation Links */}
                    <ul className="navbar-nav m-auto my-2 text-center">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">
                                Products
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    {/* Authentication and Cart Buttons */}
                    <div className="buttons text-center">

                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="btn btn-outline-dark m-2"
                                >
                                    <i className="fa fa-user me-1"></i>
                                    {user.name}
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger m-2"
                                >
                                    <i className="fa fa-sign-out me-1"></i>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="btn btn-outline-dark m-2"
                                >
                                    <i className="fa fa-sign-in me-1"></i>
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className="btn btn-outline-dark m-2"
                                >
                                    <i className="fa fa-user-plus me-1"></i>
                                    Register
                                </NavLink>
                            </>
                        )}

                        <NavLink
                            to="/cart"
                            className="btn btn-outline-dark m-2"
                        >
                            <i className="fa fa-shopping-cart me-1"></i>
                            Cart ({state.length})
                        </NavLink>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
