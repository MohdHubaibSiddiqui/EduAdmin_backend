// // const express = require("express");
// // const router = express.Router();

// // const Class =require("../models/Class");

// // router.post("/", async (req, res) => {

// //   try{
// //   const { name, departmentId } = req.body;

// //   const newClass = await Class.create({
// //     name,
// //     departmentId
// //   });

// //   res.status(201).json({ success: true, data: newClass });
// //   }
// //   catch(error){

// //     res.status(500).json({
// //       success:false,
// //       error:error.message
// //     });
// //   }
// //   });
// //   module.exports=router;
// const express = require("express");
// const router = express.Router();
// const Class = require("../models/Class");


// // CREATE Class
// // router.post("/", async (req, res) => {
// //   try {
// //     const { name, departmentId } = req.body;

// //     const newClass = await Class.create({
// //       name,
// //       departmentId
// //     });

// //     res.status(201).json({
// //       success: true,
// //       data: newClass
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       error: error.message
// //     });
// //   }
// // });
// // CREATE
// router.post("/", async (req, res) => {
//   try {
//     const { name, departmentId, teacherId } = req.body;

//     const newClass = await Class.create({ name, departmentId, teacherId });

//     res.status(201).json({ success: true, data: newClass });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// // READ All Classes
// // router.get("/", async (req, res) => {
// //   try {
// //     const classes = await Class.find();
// //     res.status(200).json({
// //       success: true,
// //       data: classes
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       error: error.message
// //     });
// //   }
// // });
// router.get("/", async (req, res) => {
//   try {
//     const classes = await Class.find()
//       .populate("departmentId", "name")
//       .populate("teacherId", "name");
//     res.status(200).json({ success: true, data: classes });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // READ Single Class
// router.get("/:id", async (req, res) => {
//   try {
//     const classItem = await Class.findById(req.params.id);

//     if (!classItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Class not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: classItem
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });


// // UPDATE Class
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const classItem = await Class.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!classItem) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Class not found"
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: classItem
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       error: error.message
// //     });
// //   }
// // });
// // UPDATE
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, departmentId, teacherId } = req.body;

//     const classItem = await Class.findByIdAndUpdate(
//       req.params.id,
//       { name, departmentId, teacherId },
//       { new: true, runValidators: true }
//     );

//     if (!classItem) return res.status(404).json({ success: false, message: "Class not found" });

//     res.status(200).json({ success: true, data: classItem });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // DELETE Class
// router.delete("/:id", async (req, res) => {
//   try {
//     const classItem = await Class.findByIdAndDelete(req.params.id);

//     if (!classItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Class not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Class deleted successfully"
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
const Class = require("../models/Class");

// CREATE Class
router.post("/", async (req, res) => {
  try {
    const { name, departmentId, teacherId } = req.body;

    const newClass = await Class.create({ name, departmentId, teacherId });

    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ All Classes (populate department and teacher)
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("departmentId", "name")
      .populate("teacherId", "name");

    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ Single Class
router.get("/:id", async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate("departmentId", "name")
      .populate("teacherId", "name");

    if (!classItem) return res.status(404).json({ success: false, message: "Class not found" });

    res.status(200).json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE Class
router.put("/:id", async (req, res) => {
  try {
    const { name, departmentId, teacherId } = req.body;

    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      { name, departmentId, teacherId },
      { new: true, runValidators: true }
    );

    if (!classItem) return res.status(404).json({ success: false, message: "Class not found" });

    res.status(200).json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Class
router.delete("/:id", async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);

    if (!classItem) return res.status(404).json({ success: false, message: "Class not found" });

    res.status(200).json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;