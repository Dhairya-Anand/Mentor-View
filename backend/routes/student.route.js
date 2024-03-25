const router = require("express").Router();
const studentController = require("../controllers/student.controller");

// GET apis
router.get("/", studentController.fetchStudents);
router.get("/all",studentController.fetchAllStudents);

// POST apis
router.post("/marks", studentController.addMarksOrUpdate);
router.post("/myStudents", studentController.fetchMyStudents);
router.post("/addStudent",studentController.addStudent);

module.exports = router;
