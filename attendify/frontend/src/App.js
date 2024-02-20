import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./scenes/HomePage/Home";
import Navbar from "./scenes/HomePage/Navbar";
import Login from "./scenes/loginSignup/Login";
import Signup from "./scenes/loginSignup/Signup";
import Sidebar from "./scenes/global/Sidebar";
import SidebarEmp from "./scenes/global/SidebarEmp";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts/index";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Employee from "./scenes/dashboard/indexEmp";
import PersonalInfo from "./scenes/contacts/personalInfo";
import FormEmp from "./scenes/form/formEmp";
import CalendarEmp from "./scenes/calendar/calendarEmp";
import FaqEmp from "./scenes/faq/faqEmp";
import BarEmp from "./scenes/bar/barEmp";
import PieEmp from "./scenes/pie/pieEmp";
import SessionNavigation from "./scenes/dashboard/SessionNavigation";
import About from "./scenes/HomePage/About";
import Contact from "./scenes/HomePage/Contact";
import Services from "./scenes/HomePage/Services";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Assume user role is determined based on authentication or other logic
  const userRole = getCurrentUserRole();

  // Function to determine the user role based on the current path or authentication
  function getCurrentUserRole() {
    // Implement your logic to determine the user role
    // For example, you can check the current path or use authentication data
    if (currentPath.includes("/adminDashboard")) {
      return "admin";
    } else if (currentPath.includes("/employeeDashboard")) {
      return "employee";
    } else {
      // Default role or unauthenticated state
      return "guest";
    }
  }

  const shouldDisplaySidebarAndTopbar =
    currentPath !== "/" &&
    currentPath !== "/about" &&
    currentPath !== "/services" &&
    currentPath !== "/contact" &&
    currentPath !== "/login" &&
    currentPath !== "/signup";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {shouldDisplaySidebarAndTopbar &&
            // Render AdminSidebar or EmployeeSidebar based on user role
            (userRole === "admin" ? (
              <Sidebar isSidebar={isSidebar} />
            ) : (
              <SidebarEmp isSidebar={isSidebar} />
            ))}
          <main className="content">
            {shouldDisplaySidebarAndTopbar && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Assume the admin and employee routes */}
              <Route path="/adminDashboard" element={<Dashboard />} />
              <Route path="/session" element={<SessionNavigation />} />
              <Route path="/adminDashboard/team" element={<Team />} />
              <Route path="/adminDashboard/contacts" element={<Contacts />} />
              <Route path="/adminDashboard/invoices" element={<Invoices />} />
              <Route path="/adminDashboard/form" element={<Form />} />
              <Route path="/adminDashboard/bar" element={<Bar />} />
              <Route path="/adminDashboard/pie" element={<Pie />} />
              <Route path="/adminDashboard/faq" element={<FAQ />} />
              <Route path="/adminDashboard/calendar" element={<Calendar />} />
              {/* Employee routes */}
              <Route path="/employeeDashboard" element={<Employee />} />
              <Route
                path="/employeeDashboard/personalInfo"
                element={<PersonalInfo />}
              />
              <Route path="/employeeDashboard/formEmp" element={<FormEmp />} />
              <Route
                path="/employeeDashboard/calendarEmp"
                element={<CalendarEmp />}
              />
              <Route path="/employeeDashboard/faqEmp" element={<FaqEmp />} />
              <Route path="/employeeDashboard/barEmp" element={<BarEmp />} />
              <Route path="/employeeDashboard/pieEmp" element={<PieEmp />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
