import toast from "react-hot-toast";
const API_URL = "http://localhost:5000/api/";

async function fetchAllStudents(){
    try {
        const response = await fetch(API_URL + "student/all", {
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

export { fetchAllStudents};