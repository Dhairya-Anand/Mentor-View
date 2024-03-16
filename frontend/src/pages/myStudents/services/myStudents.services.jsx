import toast from "react-hot-toast";
const API_URL = "https://mentor-view-hwet.onrender.com/api/";

async function fetchMyStudents(){
  try {
    console.log("fetching...");
    const mentorId = "65f29df60b9537db0b574057";
    const response = await fetch(API_URL + "student/mystudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({mentorId})
    });
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    toast.error(error.message);
  }
}

async function fetchRemoveStudent(studentId){
  try {
    const mentorId = "65f29df60b9537db0b574057";
    const response = await fetch(API_URL + "mentor/removestudent", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mentorId,
        studentId
      })
    });
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
  }
}

async function fetchSaveChanges(studentId,vivaNumber,ideationNumber,executionNumber){
  try {
    const mentorId = "65f29df60b9537db0b574057";
    const response = await fetch(API_URL + "student/marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        mentorId,
        viva: vivaNumber,
        ideation: ideationNumber,
        execution: executionNumber
      })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save changes.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    toast.error(error.message);
  }
}

async function fetchSubmitChanges(){
  try {
    const mentorId = "65f29df60b9537db0b574057";
    const response = await fetch(API_URL + "mentor/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({mentorId}),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit changes.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching my requests:", error);
    toast.error(error.message);
  }
}

export { fetchMyStudents, fetchRemoveStudent, fetchSaveChanges, fetchSubmitChanges};