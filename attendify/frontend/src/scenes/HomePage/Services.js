import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const listStyles = {
    fontSize: "18px", // Adjust the font size as needed
    marginTop: "30px", // Add space between the ul and other content
  };

  const listItemStyles = {
    marginBottom: "25px", // Add space between li elements
  };

  return (
    <div>
      <Navbar />
      <h1
        style={{
          fontFamily: ["cursive"],
          padding: "0 10px",
          marginTop: "30px",
          textAlign: "center",
          fontSize: "50px",
        }}
      >
        Services
      </h1>
      <Box m="20px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 2 */}
          <box gridColumn="span 1"></box>
          <Box
            gridColumn="span 10"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box m="20px 100px 0 100px">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  <ul style={listStyles}>
                    <li style={listItemStyles}>
                      Effortless Attendance Tracking: Simplify attendance
                      recording and management processes for organizations.
                    </li>
                    <li style={listItemStyles}>
                      Intuitive User Interface: Enjoy smooth navigation and ease
                      of use with our user-friendly interface.
                    </li>
                    <li style={listItemStyles}>
                      Secure Access Control: Ensure secure access with tailored
                      roles for administrators and employees.
                    </li>
                    <li style={listItemStyles}>
                      Reliable Data Storage: Store attendance records securely
                      for reliability and scalability.
                    </li>
                    <li style={listItemStyles}>
                      Optimized for All Devices: Experience optimal user
                      experience across desktops, tablets, and smartphones with
                      our responsive design.
                    </li>
                    <li style={listItemStyles}>
                      Transform your attendance management experience today with
                      our innovative solution.
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Services;
