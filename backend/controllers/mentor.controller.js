const Mentor = require("../models/mentor.model");
const Student = require("../models/student.model");

const addStudents = async (req, res) => {
  try {
    const { students, mentorId } = req.body;

    if (!students || !mentorId) {
      return res.json({
        error: "all fields are required",
      });
    }
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor is not found",
      });
    }

    if (mentor.isSubmitted === true) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submited the evaluation. You can no longer do changes",
      });
    }

    const currentCount = mentor.students.length;
    const newCount = currentCount + students.length;

    if (newCount < 3 || newCount > 4) {
      return res.status(400).json({
        success: false,
        message: "Mentor can only accommodate between 3 to 4 students",
      });
    }

    await Student.updateMany(
      { _id: { $in: students } },
      { isAssigned: true },
      { mentorId: mentorId }
    );

    mentor.students.push(...students);
    await mentor.save();
    return res.status(200).json({
      success: true,
      message: "student added successfully",
      mentor,
    });
  } catch (error) {
    console.log("error while adding student");
    console.log(error);
  }
};

const removeStudent = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor is not found",
      });
    }

    if (mentor.isSubmitted === true) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submited the evaluation. You can no longer do changes",
      });
    }

    await Student.findByIdAndUpdate(studentId, {
      isAssigned: false,
      viva: 0,
      ideation: 0,
      execution: 0,
      totalMarks: 0
    }, { new: true });

    const response = await Mentor.findByIdAndUpdate(
      mentorId,
      { $pull: { students: studentId } },
      { new: true }
    ).populate("students");

    return res.status(200).json(response.students);
  } catch (error) {
    console.log(error.message);
  }
};

const submitAdmin = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor is not found",
      });
    }
    if (mentor.isSubmitted === true) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submited the evaluation. You can no longer do changes",
      });
    }
    mentor.isSubmitted = true;
    await mentor.save();
    return res.status(200).json({
      success: true,
      message: "Marks submitted successfully",
      mentor: mentor,
    });
  } catch (error) {
    console.log(error.message);
    console.log("error while submiting");
  }
};

module.exports = {
  submitAdmin,
  removeStudent,
  addStudents,
};
