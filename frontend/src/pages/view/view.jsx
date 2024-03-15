import React, { useState,useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './view.css'; 
import { fetchAllStudents } from './services/view.services';

function View() {
    const [students, setStudents] = useState([]);
    const [filter, setFilter] = useState('all'); 

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllStudents();
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }
        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredStudents = students.filter(student => {
        if (filter === 'assigned') {
            return student.isAssigned;
        } else if (filter === 'unassigned') {
            return !student.isAssigned;
        }
        return true;
    });

    return(
        <div>
            <Toaster />
            <h2>Students</h2>
            <div className="filter">
                <label>Filter:</label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                </select>
            </div>
            <div className="student-list">
                {filteredStudents.map(student => (
                    <div key={student._id} className="student">
                        <p>Name: {student.name}</p>
                        <p>Assigned: {student.isAssigned ? "Yes" : "No"}</p>
                        {student.isAssigned && (
                            <>
                                <p>Viva: {student.viva}</p>
                                <p>Ideation: {student.ideation}</p>
                                <p>Execution: {student.execution}</p>
                                <p>Total Marks: {student.totalMarks}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default View;
