import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";

const EmployeeInformation = () => {
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    // Retrieve employee ID from session storage
    const id = sessionStorage.getItem("id");
    if (id) {
      // Fetch employee information based on ID from backend
      axios
        .get(`http://localhost:8081/userdata`, { params: { id: id } })
        .then((response) => {
          setEmployeeInfo(response.data); // Assuming response.data is the employee info
        })
        .catch((error) => {
          console.error("Error fetching employee information:", error);
        });
    }
  }, []);

  return (
    <Box m="20px">
      <Header title="Personal Information" subtitle="View your Profile" />
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            marginTop: "2px",
            width: "80%",
            maxHeight: 600,
            display: "flex",
          }}
        >
          <TableContainer component={Paper} sx={{ backgroundColor: "#141b2d" }}>
            <Table>
              <TableBody>
                {employeeInfo ? (
                  <>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>
                        RegistrationId
                      </TableCell>
                      <TableCell>{employeeInfo.registrationId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>LoginId</TableCell>
                      <TableCell>{employeeInfo.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>Full Name</TableCell>
                      <TableCell>{employeeInfo.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>Age</TableCell>
                      <TableCell>{employeeInfo.age}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>
                        Contact Number
                      </TableCell>
                      <TableCell>{employeeInfo.phoneNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>Email</TableCell>
                      <TableCell>{employeeInfo.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>
                        Department
                      </TableCell>
                      <TableCell>{employeeInfo.department}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>
                        Designation
                      </TableCell>
                      <TableCell>{employeeInfo.designation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>Address</TableCell>
                      <TableCell>{employeeInfo.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>City</TableCell>
                      <TableCell>{employeeInfo.city}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: "#94e2cd" }}>Pincode</TableCell>
                      <TableCell>{employeeInfo.pin_code}</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeInformation;
