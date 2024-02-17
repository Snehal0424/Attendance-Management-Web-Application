// Home page for session navigation
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from '.';
import Employee from "./indexEmp";
import { useState } from 'react';

function SessionNavigation() {
    const [role, setRole] = useState('');
    const [ LoginId, setLoginId] = useState('');
    // const [ id, setId] = useState('');

    const navigate = useNavigate()
  
    //SESSION
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8081/session')
      .then(res => {

        if (res.data.valid) {
          setRole(res.data.role) // <=====
          setLoginId(res.data.Loginid); // Add this line to set the employee ID in state
        //   setId(res.data.id);
          if (res.data.role === "admin") {

            navigate('/adminDashboard');
          } else if (res.data.role === "employee") {
            navigate('/employeeDashboard');
          }
        }
        else {
                navigate('/')
        }
                   


        //This code can be used, but using this code will navigating to "/session" only on refreshing
        // if(res.data.valid){
        //   setRole(res.data.role)
        // }
        // else{
        //   navigate('/')
        // }

      })
      .catch(err => console.log(err))
    }, [navigate])

    //SESSION
    // useEffect(() => {
    //   axios.get('http://localhost:8081/session')
    //     .then(res => {
    //       if (!res.data.valid) {
    //         navigate('/');
    //       } else {
    //         setRole(res.data.role);
    //       }
    //     })
    //     .catch(err => console.log(err));
    // }, [navigate]);
  

    // Private & Protected Route
    // const {Component} = props;
    // useEffect(() => {
    //   let login = localStorage.getItem('login');
    //   if(!login) {
    //     navigate('/');
    //   }
    // })

  return (
    <div>
      {role === "admin" && <Dashboard />}
      {role === "employee" && <Employee />}
    </div>
  )
}

export default SessionNavigation
