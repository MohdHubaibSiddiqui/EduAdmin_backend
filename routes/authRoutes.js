const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    let user;
    let role;

    // Check Admin
    user = await Admin.findOne({ email });

    if (user) {
      role = "admin";
    }

    // Check Teacher
    if (!user) {
      user = await Teacher.findOne({ email });

      if (user) {
        role = "teacher";
      }
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role },
      "johnwicksecret",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
});

module.exports = router;