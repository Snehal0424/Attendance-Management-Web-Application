import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I mark my attendance in the system?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To mark your attendance, log in to the system and find the attendance section. You can use the designated button to mark yourself as present.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I request corrections if there's an error in my attendance record?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, if you notice any errors in your attendance record, please contact the HR department or your supervisor to request corrections.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I view my attendance history?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can view your attendance history by logging into the system and navigating to your profile or the attendance section, where you'll find a detailed record of your attendance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What happens if I forget to mark attendance for a day?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you forget to mark attendance, your supervisor or HR may reach out to remind you. It's important to communicate any missed entries promptly to ensure accurate records.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Are there notifications for late arrivals or missed attendance entries?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, the system is designed to send notifications for late arrivals or missed entries. Make sure to check your notifications or email for any alerts.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I view the attendance records of my team members?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No, individual employees can only view their own attendance records. Team leaders or supervisors may have access to team attendance data for management purposes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What should I do if I encounter technical issues while marking attendance?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you experience technical issues, please report them to the IT support team immediately. In the meantime, inform your supervisor or HR about the situation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
