import toast from "react-hot-toast";
const API_URL = "http://localhost:5000/api/student";

async function fetchAddNewStudents(name,email){
    try {
        const mentorId = "65f29df60b9537db0b574057";
        const response = await fetch(API_URL + "/addStudent",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                mentorId
            })
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || "Failed to add new student");
        }
        const data = await response.json();
        toast.success(data.message);
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export {fetchAddNewStudents}