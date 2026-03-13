// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.log("❌ DB Error:", error);
//   }
// };

// module.exports = connectDB;

const dns=require("dns");
//change dns
dns.setServers(["1.1.1.1","8.8.8.8"]);
const connectDB = async () => {
require("dotenv").config();
const mongoose=require("mongoose")

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));
}
module.exports = connectDB;