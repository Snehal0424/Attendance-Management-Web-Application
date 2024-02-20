import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Tooltip from "@mui/material/Tooltip";
import { ColorModeContext } from "../../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  //for session
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        //Navigate to login page after successful logout
        navigate("/");

        document.cookie =
          "connect.sid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/adminDashboard; domain=localhost; Secure";
        // Reload the page to ensure session is properly cleared
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      ></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Tooltip title="Light Mode" arrow>
              <DarkModeOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Dark Mode" arrow>
              <LightModeOutlinedIcon />
            </Tooltip>
          )}
        </IconButton>

        <Tooltip title="Logout" arrow>
          <IconButton onClick={handleLogout}>
            <ExitToAppOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
