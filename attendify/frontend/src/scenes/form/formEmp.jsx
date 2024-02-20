import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [editedEmployeeInfo, setEditedEmployeeInfo] = useState(null);

  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    // Retrieve employee ID from session storage
    const id = sessionStorage.getItem("id");
    if (id) {
      // Fetch employee information based on ID from backend
      axios
        .get(`http://localhost:8081/employeeForm`, { params: { id: id } })
        .then((response) => {
          setEmployeeInfo(response.data); // Assuming response.data is the employee info
          setEditedEmployeeInfo(response.data); // Initialize editedEmployeeInfo with fetched data
        })
        .catch((error) => {
          console.error("Error fetching employee information:", error);
        });
    }
  }, []);

  return (
    <Box m="20px">
      <Header title="Edit Info" subtitle="Edit Your Profile" />

      <Formik
        initialValues={employeeInfo || initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Id"
                onBlur={handleBlur}
                value={employeeInfo?.id || ""}
                name="Loginid"
                error={!!touched.Loginid && !!errors.Loginid}
                helperText={touched.Loginid && errors.Loginid}
                sx={{
                  gridColumn: "span 1",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Registration Id "
                onBlur={handleBlur}
                // onChange={handleChange}
                value={employeeInfo?.registrationId || ""}
                name="registerationId"
                error={!!touched.registrationId && !!errors.registrationId}
                helperText={touched.registrationId && errors.registrationId}
                sx={{
                  gridColumn: "span 1",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={employeeInfo?.name || ""}
                name="fullName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                //onChange={handleChange}
                value={employeeInfo?.email || ""}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                value={employeeInfo?.password || ""}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                value={employeeInfo?.role || ""}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={employeeInfo?.age || ""}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={employeeInfo?.phoneNo || ""}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                value={employeeInfo?.department || ""}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Designation"
                onBlur={handleBlur}
                value={employeeInfo?.designation || ""}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                value={employeeInfo?.address || ""}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                value={employeeInfo?.city || ""}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pin Code"
                onBlur={handleBlur}
                value={employeeInfo?.pin_code || ""}
                name="pin"
                error={!!touched.pin && !!errors.pin}
                helperText={touched.pin && errors.pin}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Edit Form
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  department: yup.string().required("required"),
  designation: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  designation: "",
  department: "",
  address: "",
};

export default EmployeeForm;
