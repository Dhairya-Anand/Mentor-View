import React, { useState, useEffect } from "react";
import "./allStudents.css";
import { fetchAllStudents, fetchAddStudents } from "./services/allStudents.services";
import toast,{ Toast } from "react-hot-toast";

function AllStudents() {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllStudents();
        setAllStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (studentId) => {
    const isSelected = selectedStudents.includes(studentId);
    setSelectedStudents((prevSelectedStudents) =>
      isSelected
        ? prevSelectedStudents.filter((id) => id !== studentId)
        : [...prevSelectedStudents, studentId]
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Selected Students:", selectedStudents);
      if(selectedStudents.length === 0){
        throw new Error("No students selected");
      }
      const data = await fetchAddStudents(selectedStudents);
      if(data) window.location.reload();
    } catch (error) {
      console.error("Error sending selected students:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>All Students</h2>
      <form>
        {allStudents.map((student) => (
          <div key={student._id}>
            <label>
              <input
                type="checkbox"
                value={student._id}
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleCheckboxChange(student._id)}
              />
              {student.name}
            </label>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default AllStudents;
