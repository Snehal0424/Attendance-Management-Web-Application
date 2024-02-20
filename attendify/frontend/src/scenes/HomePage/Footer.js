// Footer.js
import React from "react";
import { FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Footer = () => {
  return (
    <footer className="footer-container text-light py-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <p className="copyright-text">&copy; 2024 Attendance Management</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
