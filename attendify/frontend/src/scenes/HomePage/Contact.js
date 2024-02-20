import React from "react";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { LinkedIn, Mail } from "@mui/icons-material";

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Navbar />
      <h1
        style={{
          fontFamily: ["cursive"],
          padding: "0 10px",
          marginTop: "30px",
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "50px",
        }}
      >
        Contact
      </h1>

      <Box m="20px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="220px"
          gap="20px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src="../../assets/Anjali.jpg"
                alt="Description"
                style={{ width: "170px", height: "auto" }}
              />
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ ml: 5, mt: 0, flexGrow: 1 }}
              >
                Anjali Nikhate
              </Typography>
              {/* <LinkedIn style={{ fontSize: 30, color: colors.grey[100] }} />
              <Mail style={{ fontSize: 30, color: colors.grey[100] }} /> */}
            </Box>
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src="../../assets/Snehal.jpg"
                alt="Description"
                style={{ width: "170px", height: "auto" }}
              />
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ ml: 5, mt: 0, flexGrow: 1 }}
              >
                Snehal Khandwe
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src="../../assets/Muskan.jpg"
                alt="Description"
                style={{ width: "170px", height: "auto" }}
              />
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ ml: 5, mt: 0, flexGrow: 1 }}
              >
                Muskan Dewangan
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box m="20px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="220px"
          gap="20px"
        >
          <Box gridColumn="span 2"></Box>
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src="../../assets/Puja.jpg"
                alt="Description"
                style={{ width: "170px", height: "auto" }}
              />
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ ml: 10, mt: 0, flexGrow: 1 }}
              >
                Puja Pant
              </Typography>
            </Box>
          </Box>

          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src="../../assets/Nishika.jpg"
                alt="Description"
                style={{ width: "170px", height: "auto" }}
              />
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ ml: 10, mt: 0, flexGrow: 1 }}
              >
                Nishika Sahu
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default Contact;
