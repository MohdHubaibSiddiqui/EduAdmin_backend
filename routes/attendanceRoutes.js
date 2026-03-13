const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Take Attendance
// router.post("/take-attendance", async (req, res) => {
//   try {
//     const attendance = await Attendance.create(req.body);
//     res.json(attendance);
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

router.post("/take-attendance", async (req, res) => {
  try {
    const { classId, date, records, teacher } = req.body;

    // Create attendance documents for each student
    const docs = records.map(r => ({
      student: r.student,
      status: r.status === "present" ? "Present" : "Absent", // match enum
      classId,
      date,
      teacher
    }));

    const attendance = await Attendance.insertMany(docs); // insert all at once
    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// View Attendance
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find().populate("student","name rollNumber ").populate("teacher","name email").populate("classId","name",);
    res.json({
      success:true,
      data:records});
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;