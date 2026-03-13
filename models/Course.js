const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name:{
  type: String,
  required:true,
  },
  description:{ String,
  type:String,
  requires:true,
  },
  classId: { type: mongoose.Schema.Types.ObjectId,
     ref: "Class" }
});
module.exports = mongoose.model("Course", courseSchema);