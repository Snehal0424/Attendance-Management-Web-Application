const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express()
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret', //a secret key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 20 ,
      //session of 20 minutes (milisec * sec * min * hour )
      // path: '/'
    
    } // set session cookie properties

}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hone@123y",
    database: "attendance"
})



//For signup/login authentication and authorization

app.get('/session', (req,res) => {
  if(req.session.role){
    return res.json({valid: true, role: req.session.role})
  }
  else{
    return res.json({valid: false})
  }
})


//SIGNUP
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`, `role`) VALUES (?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
    ]
    db.query(sql,values, (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM login WHERE `email`= ? AND `password`= ? ";

//     db.query(sql,[req.body.email, req.body.password ], (err, data) => {
//         if(err){
//             return res.json("Error");
//         }
//         if(data.length > 0){
//             const role = data[0].role;
//             return res.json("Success");
//         }else{
//             return res.json("Fail");
//         }
//     })
// })

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`= ? AND `password`= ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Error" });
      }
      console.log("Returned data:", data);
      if (data.length > 0) {

        //session
        req.session.role = data[0].role;  //can assign email as well
        req.session.LoginId = data[0].id;  // Assuming id is stored in the 'LoginId' field
        //  req.session.id = data[0].id;  // Assuming id is stored in the 'LoginId' field
        const role = data[0].role;
        console.log("User role:", req.session.role);
        console.log("ID:", req.session.LoginId /*req.session.id*/);
        return res.json({ success: true, role: req.session.role, id: req.session.LoginId /*req.session.id */ });
      } else {
        console.log("No matching records found");
        return res.json({ success: false, message: "No record existed" });
      }
    })
  })

  //LOGOUT
  app.get('/logout', (req,res) => {
    req.session.destroy();
    // return res.json("success");
    res.json({ success:true });
  })


  // API endpoint to fetch employee data
  app.get('/api/employees', (req, res) => {
    const sql = "SELECT e.id, e.registrationId, e.name, e.age, e.phoneNo, e.email, e.department, e.designation, a.address, a.city, a.pin_code FROM employeeinfo e JOIN address a ON e.address_id = a.address_id";
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error fetching employee data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(data);
    });
  });


  // app.get('/api/team', (req, res) => {
  //   const sql = "SELECT id, name, email, role FROM login";
  //   db.query(sql, (err, data) => {
  //     if (err) {
  //       console.error('Error fetching team data:', err);
  //       res.status(500).json({ error: 'Internal server error' });
  //       return;
  //     }
  //     res.json(data);
  //   });
  // });

  app.get("/api/team", (req, res) => {
    const sql = "SELECT id, name, email, role FROM login";
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error fetching team data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(data);
    });
  });

  //Attendance
  app.get("/api/attendance", (req, res) => {
    const sql = "SELECT id, name, email, attendance_timestamp, attendance_status FROM attendance";
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error fetching team data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(data);
    });
  });



  app.post("/api/form", (req, res) => {

    const { fullName, age, contact, email, department, designation, address, city, pin } = req.body;
  
    //const { name, email, password, role } = req.body;
  
    // First, insert into the address table
    const loginSql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";
    const loginValues = [fullName, email, req.body.password, req.body.role];
    
    db.query(loginSql, loginValues, (loginErr, loginResult) => {
      if (loginErr) {
        console.error('Error inserting login credentials:', loginErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const loginId = loginResult.insertId;

      const addressSql = "INSERT INTO address (address, city, pin_code) VALUES (?, ?, ?)";
      const addressValues = [address, city, pin];
      
      db.query(addressSql, addressValues, (addressErr, addressResult) => {
        if (addressErr) {
          console.error('Error inserting address:', addressErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
  
      // Once the address is inserted, get the auto-incremented address_id
      const addressId = addressResult.insertId;
  
      // Then, insert into the employeeInfo table
      const employeeSql = "INSERT INTO employeeinfo (id,name, age, phoneNo, email, department, designation, address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const employeeValues = [loginId, fullName, age, contact, email, department, designation, addressId];
  
      db.query(employeeSql, employeeValues, (employeeErr, employeeResult) => {
        if (employeeErr) {
          console.error('Error inserting employee:', employeeErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        res.json({ success: true, message: 'Employee created successfully' });
      });
    });
  });
  });

  //Mark Attendance (Admin)

 // API endpoint to update attendance status
  app.post('/api/updateAttendance', (req, res) => {
  const { id, present } = req.body;

  // Get the current date and time
  const attendanceTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Update the attendance status in the database for the employee whose login_id or id matches the given id
  const sql = 'INSERT INTO attendance (login_id, attendance_timestamp, attendance_status) SELECT id, ?, ? FROM login WHERE id = ? OR login_id = ?';

  // pool.query(sql, [attendanceTimestamp, present ? 'present' : 'absent', id, id], (err, result) => {
    pool.query(sql, [attendanceTimestamp, present, id, id], (err, result) => {
    if (err) {
      console.error('Error updating attendance:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json({ success: true, message: 'Attendance updated successfully' });
  });
});

app.listen(8081, () => {
    console.log('listening');
})
