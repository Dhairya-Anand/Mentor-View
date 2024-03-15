const router = require("express").Router();
const mentorController = require("../controllers/mentor.controller");

// POST apis
router.post("/addstudents", mentorController.addStudents);
router.post("/submit", mentorController.submit);

// DELETE apis
router.delete("/removestudent", mentorController.removeStudent);

module.exports = router;
