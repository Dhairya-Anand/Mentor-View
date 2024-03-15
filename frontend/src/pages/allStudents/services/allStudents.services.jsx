import toast from "react-hot-toast";
const API_URL = "http://localhost:5000/api/";

async function fetchAllStudents(){
    try {
        const response = await fetch(API_URL + "student", {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch students");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

async function fetchAddStudents(students){
    try {
        console.log(students);
        const mentorId = "65f29df60b9537db0b574057"; 
        const response = await fetch(API_URL + "mentor/addstudents", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mentorId,
                students,
            })
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch students");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}


export { fetchAllStudents,fetchAddStudents};