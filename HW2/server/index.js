const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Oswald.0704",
  database: "hw1_classes",
});

app.post("/create", (req, res) => {
  const id = req.body.student_id;
  const name = req.body.student_name;
  const department = req.body.student_department;

  db.query(
    "INSERT INTO hw1_classes (student_id, student_name, student_department) VALUES (?,?,?)",
    [id, name, department],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating student");
      } else {
        res.status(500).send("Student created successfully");
      }
    }
  );
});

app.get("/student", (req, res) => {
  db.query("SELECT * FROM hw1.classes.student", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching student");
    } else {
      res.send(result);
    }
  });
});

app.put("/updatestudent/:id", (req, res) => {
  const id = req.params.id;
  const newstudentname = req.body.new_studentname;
  db.query(
    "UPDATE hw1_classes.student SET student_name = ? WHERE student_name = ?",
    [newstudentname, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating student");
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletestudent/:id", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM hw1.classes.student WHERE student_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting student");
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
