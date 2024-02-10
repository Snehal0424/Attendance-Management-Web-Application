const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aditya@mysql1",
    database: "attendance"
})

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
        const role = data[0].role;
        console.log("User role:", role);
        return res.json({ success: true, role: role });
      } else {
        console.log("No matching records found");
        return res.json({ success: false, message: "No record existed" });
      }
    })
  })
  

app.listen(8081, () => {
    console.log('listening');
})
