// const express = require("express");
// const router = express.Router();
// const Teacher = require("../models/Teacher");


// // CREATE Teacher
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, password, department, classId } = req.body;

//     const teacher = await Teacher.create({
//       name,
//       email,
//       password,
//       department,
//       classId
//     });

//     res.status(201).json({
//       success: true,
//       data: teacher
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });


// // READ All Teachers
// router.get("/", async (req, res) => {
//   try {
//     const teachers = await Teacher.find();

//     res.status(200).json({
//       success: true,
//       data: teachers
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });


// // READ Single Teacher
// router.get("/:id", async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: "Teacher not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: teacher
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });


// // UPDATE Teacher
// router.put("/:id", async (req, res) => {
//   try {

//     const teacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: "Teacher not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: teacher
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });


// // DELETE Teacher
// router.delete("/:id", async (req, res) => {
//   try {

//     const teacher = await Teacher.findByIdAndDelete(req.params.id);

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: "Teacher not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Teacher deleted successfully"
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/* =========================
   REGISTER TEACHER
========================= */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password, department, classId } = req.body;

    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(409).json({
        message: "Teacher already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
      classId
    });

    const token = jwt.sign(
      { id: teacher._id },
      "johnwicksecret",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        classId: teacher.classId,
        role: teacher.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }

});


/* =========================
   LOGIN TEACHER
========================= */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found"
      });
    }

    const isMatched = await bcrypt.compare(password, teacher.password);

    if (!isMatched) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: teacher._id },
      "johnwicksecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        classId: teacher.classId,
        role: teacher.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }

});


/* =========================
   CREATE TEACHER (ADMIN)
========================= */

router.post("/", async (req, res) => {

  try {

    const { name, email, password, department, classId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      department,
      classId
    });

    res.status(201).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


/* =========================
   GET ALL TEACHERS
========================= */

router.get("/", async (req, res) => {

  try {

    const teachers = await Teacher.find();

    res.status(200).json({
      success: true,
      data: teachers
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


/* =========================
   GET SINGLE TEACHER
========================= */

router.get("/:id", async (req, res) => {

  try {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


/* =========================
   UPDATE TEACHER
========================= */

router.put("/:id", async (req, res) => {

  try {

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


/* =========================
   DELETE TEACHER
========================= */

router.delete("/:id", async (req, res) => {

  try {

    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

module.exports = router;