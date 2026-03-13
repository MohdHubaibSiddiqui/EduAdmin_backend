// const express = require("express");
// const router = express.Router();
// const Course =require ("../models/Course")

// router.post("/", async (req, res) => {

//   try{
//   const { name, description, classId } = req.body;

//   const course = await Course.create({
//     name,
//     description,
//     classId
//   });

//   res.status(201).json({ success: true, data: course });
//   }
//   catch(error){

//     res.status(500).json({
//       success:false,
//       error:error.message
//     });
//   }
//   });
//   module.exports=router;
const express = require("express");
const router = express.Router();
const Course = require("../models/Course");


// CREATE Course
router.post("/", async (req, res) => {
  try {
    const { name, description, classId } = req.body;

    const course = await Course.create({
      name,
      description,
      classId
    });

    res.status(201).json({
      success: true,
      data: course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// READ All Courses
router.get("/", async (req, res) => {
  try {

    const courses = await Course.find();

    res.status(200).json({
      success: true,
      data: courses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// READ Single Course
router.get("/:id", async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// UPDATE Course
router.put("/:id", async (req, res) => {
  try {

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// DELETE Course
router.delete("/:id", async (req, res) => {
  try {

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;