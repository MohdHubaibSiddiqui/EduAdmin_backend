// const express = require("express");
// const router = express.Router();
// const Student =require("../models/Student");

// router.post("/add-student",async(req,res)=>{
//   try{

//     const student =new Student(req.body);
    
//     await student.save();

//     res.json({
//       message:"Student added",student
//     });
//   }
//   catch(error){
//     res.status(500).json(error);
//   }
// });


// module.exports = router;
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");


/* =========================
   CREATE STUDENT
========================= */

router.post("/add-student", async (req, res) => {
  try {

    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});


/* =========================
   GET ALL STUDENTS
========================= */

router.get("/", async (req, res) => {
  try {

    const students = await Student.find();

    res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});


/* =========================
   GET SINGLE STUDENT
========================= */

router.get("/:id", async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});


/* =========================
   UPDATE STUDENT
========================= */

router.put("/:id", async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});


/* =========================
   DELETE STUDENT
========================= */

router.delete("/:id", async (req, res) => {
  try {

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
});

module.exports = router;