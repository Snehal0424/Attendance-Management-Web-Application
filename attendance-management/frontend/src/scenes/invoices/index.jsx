import { Box, useTheme, Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from 'axios'; 

// const AttendanceColumn = ({ row, onCheckboxChange }) => {
//   const [checked, setChecked] = useState(row.present || false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//     onCheckboxChange(row.id, event.target.checked);

//     // Call the API endpoint to update attendance status when checkbox is changed
//     // updateAttendance(row.id, event.target.checked);
//   };

const AttendanceColumn = ({ row, onCheckboxChange }) => {
  const [checked, setChecked] = useState(row.present || false);

  const handleChange = () => {
    setChecked(!checked);
    onCheckboxChange(row.id, !checked);

    // Call the API endpoint to update attendance status when checkbox is changed
    // updateAttendance(row.id, event.target.checked);
  };

  // const updateAttendance = (id, present) => {
  //   axios.post('/api/updateAttendance', { id, present })
  //     .then(response => {
  //       console.log('Attendance updated successfully:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error updating attendance:', error);
  //     });
  // };

  // Render checkbox only if the employee is absent
  // return !row.present ? (
  //   <Checkbox checked={checked} onChange={handleChange} />
  // ) : null;

  return (
    <input type="checkbox" checked={checked} onChange={handleChange} />
  );
};

const Invoices = () => {
  const theme = useTheme();
  const [invoices, setInvoices] = useState([]);
  const colors = tokens(theme.palette.mode);
  // const colors = theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.secondary;

  useEffect(() => {
    // Fetch attendance data from the backend when the component mounts
    axios.get('http://localhost:8081/api/attendance')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  const handleAttendanceChange = (id, present) => {
    // Send request to update attendance status to the backend
    axios.post('/api/updateAttendance', { id, present})
      .then(response => {
        console.log('Attendance updated successfully:', response.data);
        // Update the local state if needed
        const updatedInvoices = invoices.map(invoice =>
          invoice.id === id ? { ...invoice, present } : invoice
        );
        setInvoices(updatedInvoices);
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "attendance",
      headerName: "Present/Absent",
      flex: 1,
      renderCell: (params) => (
        <AttendanceColumn
          row={params.row}
          onCheckboxChange={(id, value) => handleAttendanceChange(id, value)}
        />
      ),
    },
  ];

  // const handleAttendanceChange = (id, value) => {
  //   // Update the 'present' field in your data based on the checkbox changes
  //   //const updatedData = mockDataInvoices.map((item) =>
  //     //item.id === id ? { ...item, present: value } : item
  //   //);
  //   // You might want to use a state or some other method to manage your data changes.
  //   // For now, let's assume you have a function to update your data.
  //   //updateData(updatedData);
  // };

  // const updateData = (updatedData) => {
  //   // Replace this function with your own logic to update the data
  //   // For example, if you are using state, you can use a state update function.
  //   console.log("Updated Data:", updatedData);
  // };

  return (
    <Box m="20px">
      <Header title="ATTENDANCE" subtitle="Mark Attendance" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={invoices}
          columns={columns}
          isCellEditable={() => true}
          //isCellEditable={(params) => params.field === "attendance" && !params.row.present}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
