// // const express = require("express");
// // const router = express.Router();
// // const Admin =require("../models/Admin");

// // router.post('/register',async(req,res)=>{
// //     try{
// //         const{name,email,password}=req.body;
// //         const existingAdmin =await Admin.findOne({email});
        
// //         if (existingAdmin){
// //             return res.status(409).json({message:"Admin already exists"});
// //         }

// //         const admin =new Admin({
// //             name:name,
// //             email,
// //             password
// //         });

// //         await admin.save();

// //         res.json({message:"Admin registered"},admin);

// //     }
// //     catch(error){
// //         res.status(500).json(error);
// //     }
// // });

// // //LOGIN ADMIN

// // router.post("/login",async (req,res)=>{
// //     try{

// //         const {email,password}=req.body;

// //         const admin =await Admin.findOne({email});
        
// //         if(admin.password!==password){
// //             return res.json({message:"Wrong password"});
// //         }
// //         res.json(
// //             {message:"Login Successfull",admin}
// //         );
// //     }
// //     catch(error){
// //         res.status(500).json(error);
// //     }
// // });
// //     module.exports =router;

// const express = require("express");
// const router = express.Router();
// const Admin = require("../models/Admin");
// const bcrypt = require("bcrypt");

// // REGISTER ADMIN
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if admin exists
//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) {
//             return res.status(409).json({ message: "Admin already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const admin = new Admin({
//             name,
//             email,
//             password: hashedPassword
//         });

//         await admin.save();

//         res.status(201).json({ message: "Admin registered successfully", admin: { name, email } });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // LOGIN ADMIN
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(404).json({ message: "Admin not found" });
//         }

//         // Compare password with hash
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Wrong password" });
//         }

//         res.status(200).json({ message: "Login successful", admin: { name: admin.name, email: admin.email } });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// REGISTER ADMIN
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Create token
    const token = jwt.sign({ id: admin._id }, "johnwicksecret", {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create token
    const token = jwt.sign({ id: admin._id }, "johnwicksecret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;