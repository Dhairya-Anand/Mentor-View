const Mentor = require("../models/mentor.model");
const Student = require("../models/student.model");

const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (!students) {
      res.status(400).json({
        success: "false",
        message: "error while fetching students",
      });
    }
    res.status(200).json(students);
  } catch (error) {
    console.log("error while fetching students");
  }
};

const fetchStudents = async (req, res) => {
  try {
    const students = await Student.find({ isAssigned: false });
    if (!students) {
      res.status(400).json({
        success: "false",
        message: "error while fetching students",
      });
    }
    res.status(200).json(students);
  } catch (error) {
    console.log("error while fetching students");
  }
};

const addMarksOrUpdate = async (req, res) => {
  try {
    const { studentId, mentorId, viva, ideation, execution } = req.body;

    if (!studentId || viva < 0 || ideation < 0 || execution < 0) {
      return res.status(400).send("All fields are required");
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).json({
        success: false,
        message: "mentor not found",
      });
    }

    if (mentor.isSubmitted === true) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted the evaluation. You can no longer do changes",
      });
    }

    const totalMarks = viva + ideation + execution;

    const existingMarks = await Student.findOneAndUpdate(
      { _id: studentId },
      {
        $set: {
          viva: viva,
          ideation: ideation,
          execution: execution,
          totalMarks: totalMarks,
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Marks are added successfully",
      marks: existingMarks,
    });
  } catch (error) {
    console.log(error.message);
    console.log("error while adding marks");
  }
};

const fetchMyStudents = async (req, res) => {
  try {
    const { mentorId } = req.body;
    if (!mentorId) {
      return res.status(400).json({
        success: false,
        message: "Mentor id is not present.",
      });
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      console.log("mentor is not found");
      return res.status(400).json({ message: "mentor is not present in db" });
    }

    const mentorData = await mentor.populate("students");

    return res.status(200).json(mentorData.students);
  } catch (error) {
    console.log(error.message);
    console.log("error while fetching my Students");
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email, mentorId } = req.body;
    if (!name || !email || !mentorId) {
      return res.status(400).json({
        success: false,
        message: "All fields are neccessary",
      });
    }
    const response = await Student.create({
      name: name,
      email: email,
      mentorID: mentorId,
    });
    if (!response) {
      return res.status(400).json({
        succes: false,
        message: "Internal Server error",
      });
    }
    return res.status(502).json({
      success: true,
      message: "New student has added",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  fetchMyStudents,
  addMarksOrUpdate,
  fetchStudents,
  fetchAllStudents,
  addStudent,
};
