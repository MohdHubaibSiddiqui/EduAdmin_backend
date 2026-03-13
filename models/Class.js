const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  name:{ 
  type:String,
  required:true},

  departmentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Department" },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "Teacher" } // optional
  
});
module.exports = mongoose.model("Class", classSchema);