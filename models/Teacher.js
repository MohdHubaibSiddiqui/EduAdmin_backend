const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        require:true,
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required:true,
    },
    
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required:true,
      },
    
    role:{
        type:String,
        default:"teacher"
        },

})

    module.exports =mongoose.model("Teacher",teacherSchema);