const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret", //a secret key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 20,
      //session of 20 minutes (milisec * sec * min * hour )
      // path: '/'
    }, // set session cookie properties
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aditya@mysql1",
  database: "attendance",
});

//For signup/login authentication and authorization

app.get("/session", (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role });
  } else {
    return res.json({ valid: false });
  }
});

//SIGNUP
app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO login (`name`, `email`, `password`, `role`) VALUES (?,?,?,?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

//login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email`= ? AND `password`= ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Error" });
    }
    console.log("Returned data:", data);
    if (data.length > 0) {
      //session
      req.session.role = data[0].role; //can assign email as well
      req.session.LoginId = data[0].id; // Assuming id is stored in the 'LoginId' field
      //  req.session.id = data[0].id;  // Assuming id is stored in the 'LoginId' field
      const role = data[0].role;
      console.log("User role:", req.session.role);
      console.log("ID:", req.session.LoginId /*req.session.id*/);
      return res.json({
        success: true,
        role: req.session.role,
        id: req.session.LoginId /*req.session.id */,
      });
    } else {
      console.log("No matching records found");
      return res.json({ success: false, message: "No record existed" });
    }
  });
});

//LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy();
  // return res.json("success");
  res.json({ success: true });
});

// API endpoint to fetch employee data
app.get("/api/employees", (req, res) => {
  const sql =
    "SELECT e.id, e.registrationId, e.name, e.age, e.phoneNo, e.email, e.department, e.designation, a.address, a.city, a.pin_code FROM employeeinfo e JOIN address a ON e.address_id = a.address_id";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});

app.get("/api/team", (req, res) => {
  const sql = "SELECT id, name, email, role FROM login";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching team data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});

//Attendance ADMIN GET
app.get("/api/attendance", (req, res) => {
  const sql =
    "SELECT id, name, email, attendance_timestamp, attendance_status FROM attendance";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching team data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});

app.post("/api/form", (req, res) => {
  const {
    fullName,
    age,
    contact,
    email,
    department,
    designation,
    address,
    city,
    pin,
  } = req.body;

  //const { name, email, password, role } = req.body;

  // First, insert into the address table
  const loginSql =
    "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";
  const loginValues = [fullName, email, req.body.password, req.body.role];

  db.query(loginSql, loginValues, (loginErr, loginResult) => {
    if (loginErr) {
      console.error("Error inserting login credentials:", loginErr);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const loginId = loginResult.insertId;

    const addressSql =
      "INSERT INTO address (address, city, pin_code) VALUES (?, ?, ?)";
    const addressValues = [address, city, pin];

    db.query(addressSql, addressValues, (addressErr, addressResult) => {
      if (addressErr) {
        console.error("Error inserting address:", addressErr);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Once the address is inserted, get the auto-incremented address_id
      const addressId = addressResult.insertId;

      // Then, insert into the employeeInfo table
      const employeeSql =
        "INSERT INTO employeeinfo (id,name, age, phoneNo, email, department, designation, address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const employeeValues = [
        loginId,
        fullName,
        age,
        contact,
        email,
        department,
        designation,
        addressId,
      ];

      db.query(employeeSql, employeeValues, (employeeErr, employeeResult) => {
        if (employeeErr) {
          console.error("Error inserting employee:", employeeErr);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res.json({ success: true, message: "Employee created successfully" });
      });
    });
  });
});

// Personal Info of Employee
// Endpoint to fetch personal information of employee by ID

app.get("/userdata", (req, res) => {
  // Retrieve employee ID from the request parameters
  const id = req.query.id;
  // Check if ID is provided
  if (!id) {
    res.status(400).json({ error: "Employee ID is required" });
    return;
  }
  const sql = `SELECT e.id, e.registrationId, e.name, e.age, e.phoneNo, e.email, e.department, e.designation, a.address, a.city, a.pin_code 
               FROM employeeinfo e 
               JOIN address a ON e.address_id = a.address_id
               WHERE e.id = ?`;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(data[0]); // Assuming only one employee will be returned
  });
});

//MARK ATTENDANCE FROM EMPLOYEE SIDE
//CORRECT CODE

app.post("/markAttendance", (req, res) => {
  // Retrieve employee ID from the request body
  const id = req.body.id;

  if (!id) {
    res.status(400).json({ error: "Employee ID not provided in the request" });
    return;
  }

  const attendanceData = {
    attendance_status: true,
    attendance_timestamp: new Date(), // Current timestamp
  };

  console.log("Attendance Data:", attendanceData); // Log attendanceData
  // Update attendance data in the database for the provided employee ID
  const sql =
    "UPDATE attendance SET attendance_status = ?, attendance_timestamp = ? WHERE id = ?";
  db.query(
    sql,
    [attendanceData.attendance_status, attendanceData.attendance_timestamp, id],
    (err, result) => {
      if (err) {
        console.error("Error marking attendance:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ success: true, message: "Attendance marked successfully" });
    }
  );
});

//For gettong name of employee through id dtored in sessionStorage
app.get("/sidebarInfo", (req, res) => {
  // Retrieve employee ID from the request parameters
  const id = req.query.id;
  // Check if ID is provided
  if (!id) {
    res.status(400).json({ error: "Employee ID is required" });
    return;
  }
  const sql = `SELECT e.name, e.designation FROM employeeinfo e WHERE e.id = ?`;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(data[0]); // Assuming only one employee will be returned
  });
});

//For gettong name of admin through id dtored in sessionStorage
app.get("/adminSidebarInfo", (req, res) => {
  // Retrieve employee ID from the request parameters
  const id = req.query.id;
  // Check if ID is provided
  if (!id) {
    res.status(400).json({ error: "Employee ID is required" });
    return;
  }
  const sql = `SELECT e.name FROM employeeinfo e WHERE e.id = ?`;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching admin data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }
    res.json(data[0]); // Assuming only one employee will be returned
  });
});

//GET INFORMATION INTO EMPLOYEE FORM
app.get("/employeeForm", (req, res) => {
  // Retrieve employee ID from the request parameters
  const id = req.query.id;
  // Check if ID is provided
  if (!id) {
    res.status(400).json({ error: "Employee ID is required" });
    return;
  }
  const sql = `SELECT e.id, e.registrationId, e.name, e.age, e.phoneNo, e.email, e.department, e.designation, a.address, a.city, a.pin_code , l.password, l.role
               FROM employeeinfo e 
               JOIN address a ON e.address_id = a.address_id
               JOIN login l ON e.id = l.id
               WHERE e.id = ?`;
  // const sqlq = SELECT password, role FROM login WHERE id = ?
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(data[0]); // Assuming only one employee will be returned
  });
});

//ADMIN: Dashboard Attendance Marked
app.get("/present", (req, res) => {
  const sql =
    "SELECT id, name, attendance_timestamp, attendance_status FROM attendance WHERE attendance_status = 1";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching present team data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(data);
  });
});

//EMPLOYEE: Dashboard Attendance Marked
app.get("/emppresent", (req, res) => {
  // Retrieve employee ID from the request parameters
  const id = req.query.id;
  // Check if ID is provided
  if (!id) {
    res.status(400).json({ error: "Employee ID is required" });
    return;
  }
  const sql = `SELECT name, attendance_timestamp, attendance_status FROM attendance WHERE id = ?`;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching employee data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (data.length === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(data[0]); // Assuming only one employee will be returned
  });
});

app.listen(8081, () => {
  console.log("listening");
});
