const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  student: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Student" },

  teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Teacher"
  },
  
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class" },

  date:{
    type: Date,
    default:Date.now },

  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required:true }
});
module.exports = mongoose.model("Attendance", attendanceSchema);