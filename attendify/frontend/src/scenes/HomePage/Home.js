import React from "react";
import Navbar from "./Navbar";
import { MovingComponent } from "react-moving-text";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="text-white  vh-100" style={{ backgroundColor: "#141b2d" }}>
      <Navbar />
      <div>
        <div className="container text-center">
          <h1 className="mt-5">
            Welcome to the Attendance Management Web Application
          </h1>
          <p className="mt-2" style={{ fontSize: "22px" }}>
            Explore our website and Get Started
          </p>
        </div>
        <div className="home-container">
          <div className="left">
            <MovingComponent
              type="swing"
              duration="2000ms"
              delay="1s"
              direction="alternate"
              timing="ease-in-out"
              iteration="infinite"
              fillMode="backwards"
            >
              <img src="" alt="" />
              <h1>
                Attendify
                <i
                  className="fab fa-typo3"
                  style={{ margin: "0 10px", color: "red" }}
                ></i>
              </h1>
            </MovingComponent>
          </div>
          <div className="right">
            <img src={`../../assets/mainchar.png`} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
