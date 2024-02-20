import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../../index.css";

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";

const markAttendance = () => {
  // Retrieve employee ID from session storage
  const id = sessionStorage.getItem("id");

  if (!id) {
    console.error("Employee ID not found in session");
    return;
  }

  // Send request to mark attendance
  axios
    .post("http://localhost:8081/markAttendance", { id })
    .then((response) => {
      console.log("Attendance marked successfully:", response.data);
      // Optionally, update UI or show a success message
    })
    .catch((error) => {
      console.error("Error marking attendance:", error);
      // Handle error
    });
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employeePresent, setEmployeePresent] = useState(null);
  useEffect(() => {
    // Retrieve employee ID from session storage
    const id = sessionStorage.getItem("id");
    if (id) {
      // Fetch employee information based on ID from backend
      axios
        .get(`http://localhost:8081/emppresent`, { params: { id: id } })
        .then((response) => {
          setEmployeePresent(response.data); // Assuming response.data is the employee info
        })
        .catch((error) => {
          console.error("Error fetching employee information:", error);
        });
    }
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            onClick={markAttendance}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <CheckCircleOutlineIcon sx={{ mr: "10px" }} />
            Mark Attendance
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox subtitle="Total Working Days" />
          <StatBox title="23" icon={<AccessTimeIcon fontSize="large" />} />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox subtitle="Present Days" />
          <StatBox
            title="19"
            icon={<CheckCircleOutlineIcon fontSize="large" />}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox subtitle="Absent Days" />
          <StatBox title="3" icon={<HighlightOffIcon fontSize="large" />} />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            height="60px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Attendance Marked
            </Typography>
          </Box>
          {employeePresent ? (
            <Box
              // key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              height="75px"
            >
              <PersonOutlineIcon fontSize="large" color="text-light" />
              <Box sx={{ marginRight: "50px" }}>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {employeePresent.name}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography>No attendance marked for this employee.</Typography>
          )}
          {employeePresent ? (
            <Box
              // key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              height="75px"
            >
              <CheckCircleOutlineIcon fontSize="large" color="success" />
              <Box sx={{ marginRight: "50px" }}>
                <Typography color={colors.grey[100]}>
                  {employeePresent.attendance_status ? "Present" : "Absent"}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography>No attendance marked for this employee.</Typography>
          )}

          {employeePresent ? (
            <Box
              // key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              height="75px"
            >
              <ScheduleIcon fontSize="large" color="info" />
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                sx={{ marginRight: "50px" }}
              >
                {employeePresent.attendance_timestamp}
              </Box>
            </Box>
          ) : (
            <Typography>No attendance marked for this employee.</Typography>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Monthly Performance
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            ></Typography>
            <Typography variant="h4">Good</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Monthly Status
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
