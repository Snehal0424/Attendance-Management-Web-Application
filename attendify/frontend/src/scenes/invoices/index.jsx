import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme, Switch } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Invoices = () => {
  const theme = useTheme();
  const [invoices, setInvoices] = useState([]);
  const colors = tokens(theme.palette.mode);

  const handleToggle = async (id, isChecked) => {
    try {
      if (isChecked) {
        // If isChecked is true, send a POST request to mark attendance
        const response = await axios.post(
          `http://localhost:8081/markAttendance`,
          { id }
        );
        console.log("Attendance marked successfully:", response.data);
      } else {
        // If isChecked is false, update the attendance status using PUT request
        const newStatus = isChecked ? 1 : 0;
        await axios.put(`http://localhost:8081/api/attendance/${id}`, {
          attendance_status: newStatus,
        });

        // Update the local state immediately
        const updatedInvoices = invoices.map((invoice) =>
          invoice.id === id
            ? { ...invoice, attendance_status: newStatus }
            : invoice
        );
        setInvoices(updatedInvoices);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  useEffect(() => {
    // Fetch attendance data from the backend when the component mounts
    axios
      .get("http://localhost:8081/api/attendance")
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [handleToggle]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "attendance_timestamp",
      headerName: "Attendance Timestamp",
      flex: 1,
    },
    {
      field: "attendance",
      headerName: "Present/Absent",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Switch
          checked={params.row.attendance_status === 1}
          onChange={(event) =>
            handleToggle(params.row.id, event.target.checked)
          }
          color={params.row.attendance_status === 1 ? "success" : "primary"}
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ATTENDANCE" subtitle="Mark Attendance" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
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
          "& .MuiSwitch-root.Mui-checked .MuiSwitch-track": {
            backgroundColor: colors.greenAccent[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={invoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
