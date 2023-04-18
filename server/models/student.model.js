const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  erno: {
    type: String,
    required: [true, "Enrollment is required "],
    unique: true,
  },
  rno: {
    type: Number,
    required: [true, "roll number is required "],
  },
  github: {
    type: String,
    required: [true, "github profile is required "],
  },
  phno: {
    type: String,
    required: [true, "phone number is required "],
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  isTopicFinalised: {
    type: Boolean,
  },
});

StudentSchema.path("email").validate((val) => {
  return validator.isEmail(val);
}, "Invalid email");

StudentSchema.path("phno").validate((val) => {
  return validator.isMobilePhone(val);
}, "Invalid phone number");


const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
