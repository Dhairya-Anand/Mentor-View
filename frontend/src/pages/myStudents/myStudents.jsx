import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./myStudents.css"
import { fetchMyStudents, fetchRemoveStudent, fetchSaveChanges, fetchSubmitChanges} from "./services/myStudents.services"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function MyStudents() {
  const [activeTab, setActiveTab] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [myStudents,setMyStudents] = useState([]);
  const [editedMarks, setEditedMarks] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMyStudents();
        setMyStudents(data);
      } catch (error) {
        console.error("Error fetching my requests:", error);
      }
    }
    fetchData();
  }, []);

  const generatePDF = async (studentData) => {
    const docDefinition = {
      content: [
        { text: "Student report", style: "header" },
        { text: "Name: " + studentData.name },
        { text: "Viva: " + (studentData.viva ? studentData.viva : 0)},
        { text: "Execution: " + (studentData.execution ? studentData.execution : 0)},
        { text: "ideation: " + (studentData.ideation ? studentData.ideation : 0)},
        { text: "Total marks: " + studentData.totalMarks},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(studentData.name + "_report.pdf");
  };
  
  const handleTabChange = (name) => {
    setActiveTab(name);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    const student = myStudents.find((student) => student.name === activeTab);
    setEditedMarks(student);
  };

  const handleSaveChanges = async () => {
    try {
      const vivaNumber = parseInt(editedMarks.viva);
      const ideationNumber = parseInt(editedMarks.ideation);
      const executionNumber = parseInt(editedMarks.execution);
      const studentId = editedMarks._id;
  
      if (isNaN(vivaNumber) || isNaN(ideationNumber) || isNaN(executionNumber) ||
          vivaNumber <= -1 || vivaNumber > 10 || 
          ideationNumber <= -1 || ideationNumber > 10 || 
          executionNumber <= -1 || executionNumber > 10) {
        throw new Error('Marks should be valid numbers between 0 and 10 inclusive.');
      }

      const data = await fetchSaveChanges(studentId,vivaNumber,ideationNumber,executionNumber);
      if(!data) return;

      const index = myStudents.findIndex(student => student._id === data.marks._id);
      if (index !== -1) {
        const updatedStudents = [...myStudents];
        updatedStudents[index] = { ...updatedStudents[index], ...data.marks };
        setMyStudents(updatedStudents);
      }
    } catch (error) {
      console.error("Error fetching my requests:", error);
      toast.error(error.message);
    }
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMarks((prevMarks) => ({
      ...prevMarks,
      [name]: value,
    }));
  };

  const handleRemoveButtonClick = async(studentId) => {
    try {
      if (myStudents.length <= 3) {
        throw new Error("Cannot remove student: Minimum 3 students required.");
      }
      const data = await fetchRemoveStudent(studentId);
      if(!data) return;
      setMyStudents(data);
      setActiveTab("");
    } catch (error) {
      console.error("Error fetching my requests:", error);
      toast.error(error.message);
    }
  }

  const handleSubmitChanges = async() => {
    try {
      if(myStudents.length < 3){
        throw new Error("Add more students to the submit the evaluation");
      }
      const data = await fetchSubmitChanges();
      if(!data) return;
      const students = data.mentor.students;
      students.map((student) => (
        generatePDF(student)
      ));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <div>
        <h2>My Students</h2>
        <div className="tab-bar">
          {myStudents.length>0 && myStudents.map((student) => (
            <div key={student._id}>
              <button
                className={activeTab === student.name ? "active" : ""}
                onClick={() => handleTabChange(student.name)}>
                {student.name}
              </button>
            </div>
          ))}
        </div>
        <hr />
        {!activeTab && (<div><p>Add/Select Students to start Grading.....</p></div>)}
        {activeTab && (
          <>
            {!isEditing && (
              <div className="student-marks">
                <h2>Marksheet</h2>
                <p>Viva: {myStudents.find((student) => student.name === activeTab).viva}</p>
                <p>Ideation: {myStudents.find((student) => student.name === activeTab).ideation}</p>
                <p>Execution: {myStudents.find((student) => student.name === activeTab).execution}</p>
                <p>Total Marks: {myStudents.find((student) => student.name === activeTab).totalMarks}</p>
                <div className="student-marks-btn">
                  <button onClick={handleEditButtonClick}>
                    Edit
                  </button>
                  <button onClick={() => handleRemoveButtonClick(myStudents.find((student) => student.name === activeTab)._id)}>
                    Remove
                  </button>
                </div>
              </div>
            )}
            {isEditing && (
              <div className="edit-popup">
                <h2>Edit Marks</h2>
                <p>Viva:</p>
                <input
                  type="text"
                  name="viva"
                  value={editedMarks.viva}
                  onChange={handleInputChange}
                />
                <p>Ideation</p>
                <input
                  type="text"
                  name="ideation"
                  value={editedMarks.ideation}
                  onChange={handleInputChange}
                />
                <p>Exectuion:</p>
                <input
                  type="text"
                  name="execution"
                  value={editedMarks.execution}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveChanges}>Save Changes</button>
              </div>
            )}
          </>
        )}
        <hr />
      </div>
      {activeTab && (
        <div className="submit-btn">
          <button onClick={handleSubmitChanges}>Submit Changes</button>
        </div>
      )}
    </div>
  );
}

export default MyStudents;
