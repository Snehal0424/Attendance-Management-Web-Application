import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const paraStyles = {
    fontSize: "18px", // Adjust the font size as needed
    marginTop: "30px", // Add space between the ul and other content
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
        About
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
                  <p style={paraStyles}>
                    Welcome to Attendify, your go-to solution for streamlined
                    attendance management. Here's a glimpse into who we are and
                    what we stand for:
                  </p>

                  <p style={paraStyles}>
                    At Attendify, we understand the complexities that come with
                    managing attendance in organizations of all sizes. That's
                    why we've crafted a user-friendly web application aimed at
                    simplifying this process and empowering businesses to
                    efficiently track and manage attendance.
                  </p>

                  <p style={paraStyles}>
                    Our mission is to provide organizations with a reliable,
                    secure, and intuitive platform that enhances their
                    attendance management workflows. With Attendify, you can say
                    goodbye to cumbersome manual processes and hello to
                    automated efficiency.
                  </p>
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

export default About;
