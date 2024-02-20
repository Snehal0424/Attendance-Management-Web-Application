import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="sticky-top navbar navbar-expand-lg navbar-light">
        <div className="container text-light">
          <Link
            to="/"
            className="navbar-brand"
            style={{ fontSize: "28px", color: "white" }}
          >
            Attendify
            <i
              className="fab fa-typo3"
              style={{ margin: "0 10px", color: "red" }}
            ></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${click ? "show" : ""} `}>
            <ul className="navbar-nav ms-auto" style={{ fontSize: "18px" }}>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/about"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/services"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/contact"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/login"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item" style={{ margin: "0 10px" }}>
                <Link
                  to="/signup"
                  className="nav-link text-white"
                  onClick={closeMobileMenu}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
