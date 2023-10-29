import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [student_id, setStudent_ID] = useState(0);
  const [student_name, setStudent_Name] = useState("");
  const [student_department, setStudent_Department] = useState("");
  
  const [studentList, setStudentList] = useState([]);

  const addStudent = () => {
    Axios.post("http://localhost:3001/create", {
      student_id: student_id,
      student_name: student_name,
      student_department: student_department,
     
    }).then(() => {
      getUsers();
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/student").then((response) => {
      setStudentList(response.data);
    });
  };

  const updateStudent = (id) => {
    const newStudent_ID = prompt("Enter new student_id:");
    if (newStudent_ID !== null) {
      Axios.put(`http://localhost:3001/updateUser/${student_id}`, {
        newStudent_ID: newStudent_ID,
      }).then(() => {
        getUsers(); // Refresh the user list
      });
    }
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
     getUsers();
    })
  };

  return (
    <div className="App">
      <div className="information">
        <label>StudentID:</label>
        <input
          type="number"
          onChange={(event) => {
            setStudent_ID(event.target.value);
          }}
        />
        <label>Student_Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setStudent_Name(event.target.value);
          }}
        />
        <label>Student_Department:</label>
        <input
          type="text"
          onChange={(event) => {
            setStudent_Department(event.target.value);
          }}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      <div className="student">
        <button onClick={getUsers}>Show Student</button>

        {studentList.map((val, key) => {
          return (
            <div className="student" >
              <div>
                <h3>ID: {val.student_id}</h3>
                <h3>Name: {val.student_name}</h3>
                <h3>DEPARTMENT: {val.student_department}</h3>
              </div>
            <div>
                <button
                  onClick={() => {
                    updateStudent(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteStudent(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
