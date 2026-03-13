const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
  },
  rollNumber:{
    type: String,
    required:true,
  },
  class: {type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required:true,
  },
  
});
module.exports = mongoose.model("Student", studentSchema);