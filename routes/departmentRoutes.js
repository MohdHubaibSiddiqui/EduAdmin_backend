const express = require("express");
const router = express.Router();
const Department = require("../models/Department");


// CREATE Department
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const department = await Department.create({
      name,
      description
    });

    res.status(201).json({
      success: true,
      data: department
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// READ All Departments
router.get("/", async (req, res) => {
  try {

    const departments = await Department.find();

    res.status(200).json({
      success: true,
      data: departments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// READ Single Department
router.get("/:id", async (req, res) => {
  try {

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// UPDATE Department
router.put("/:id", async (req, res) => {
  try {

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// DELETE Department
router.delete("/:id", async (req, res) => {
  try {

    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;