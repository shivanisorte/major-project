const mongoose = require("mongoose");
const validator = require("validator")
const { Schema } = mongoose;

const CoordinatorSchema = new Schema({
  name: { 
    type: String, 
    required: [true, "name is required "] 
  },
  college: { 
    type: String, 
    required: [true, "college is required "] 
  },
  phno: {
    type: String,
    required: [true, "phone number is required "],
  },
  email: {
    type: String,
    required: [true, "email is required "],
  },
});

// email validator
CoordinatorSchema.path("email").validate((val) => {
  return validator.isEmail(val);
}, "Invalid email");

// phone number validator
CoordinatorSchema.path("phno").validate((val) => {
  return validator.isMobilePhone(val);
}, "Invalid phone number");

const Coordinator = mongoose.model("Coordinator", CoordinatorSchema);

module.exports = Coordinator;
