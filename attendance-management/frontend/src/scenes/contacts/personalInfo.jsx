import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";

const YourParentComponent = () => {
  const staticData = {
    firstName: "John",
    lastName: "Doe",
    // Add more properties if needed
  };

  return <EmployeeForm staticData={staticData} />;
};

const EmployeeForm = ({ staticData }) => {
  return (
    <Box m="20px">
      <Header title="Personal Information" subtitle="View your Profile" />

      <Box>
        <Typography variant="h4">First Name: {staticData?.firstName}</Typography>
        <br></br>
        <Typography variant="h4">Last Name: {staticData?.lastName}</Typography>
        <br></br>
        <Typography variant="h4">Email: {staticData?.email}</Typography>
        <br></br>
        <Typography variant="h4">Contact Number: {staticData?.contactnumber}</Typography>
        <br></br>
        <Typography variant="h4">Department: {staticData?.department}</Typography>
        <br></br>
        <Typography variant="h4">Designation: {staticData?.designation}</Typography>
        <br></br>
        <Typography variant="h4">Address: {staticData?.address}</Typography>
        {/* Add more static information as needed */}
      </Box>
    </Box>
  );
};

export default EmployeeForm;