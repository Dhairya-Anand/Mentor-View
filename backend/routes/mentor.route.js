const router = require("express").Router();
const mentorController = require("../controllers/mentor.controller");

// POST apis
router.post("/addstudents", mentorController.addStudents);
router.post("/submit", mentorController.submitAdmin);

// PUT apis
router.delete("/removestudent", mentorController.removeStudent);

module.exports = router;
