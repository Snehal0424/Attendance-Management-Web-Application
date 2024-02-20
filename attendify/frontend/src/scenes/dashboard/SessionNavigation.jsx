// Home page for session navigation
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from ".";
import Employee from "./indexEmp";
import { useState } from "react";

function SessionNavigation() {
  const [role, setRole] = useState("");
  const [LoginId, setLoginId] = useState("");
  // const [ id, setId] = useState('');

  const navigate = useNavigate();

  //SESSION
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/session")
      .then((res) => {
        if (res.data.valid) {
          setRole(res.data.role); // <=====
          setLoginId(res.data.LoginId); // Add this line to set the employee ID in state
          // setId(res.data.id);
          if (res.data.role === "admin") {
            navigate("/adminDashboard");
          } else if (res.data.role === "employee") {
            navigate("/employeeDashboard");
          }
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div>
      {role === "admin" && <Dashboard />}
      {role === "employee" && <Employee />}
    </div>
  );
}

export default SessionNavigation;
