import React, { useState } from "react";
import axios from "axios";
import Validation from "./LoginValidation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Navbar from "../../scenes/HomePage/Navbar";
import Footer from "../../scenes/HomePage/Footer";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  //session
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/session")
      .then((res) => {
        if (res.data.valid) {
          navigate("/session");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        //console.log(err)

        // Handle the error here
        console.error("Error checking session:", err);
        // For example, set an error state
        setErrors({ sessionCheck: "Error checking session" });
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    //SESSION for storage of loginId and role

    try {
      const response = await axios.post("http://localhost:8081/login", values);
      const { success, role, id } = response.data; // Here role and id are same names as in DB to correctly take values
      if (success) {
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("id", id);
        if (role === "admin") {
          navigate("/adminDashboard");
        } else if (role === "employee") {
          navigate("/employeeDashboard");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="loginaut"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#141b2d",
      }}
    >
      <Navbar />
      <div
        style={{ marginTop: "-7vh" }}
        className="d-flex flex-column justify-content-center align-items-center vh-100"
      >
        <div className="bg-white p-4 rounded w-25">
          <h2 className="text-center text-dark">
            <strong>Log In</strong>
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3 text-dark">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>

            <div className="mb-3 text-dark">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 ">
              <strong>Log In</strong>
            </button>
            <p></p>
            <Link
              to="/signup"
              className="btn btn-default border w-100 bg-light text-dark "
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
