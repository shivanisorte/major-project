const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email id!`,
    },
  },
  erno: {
    type: String,
    required: [true, "Enrollment is required "],
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
    type: Number,
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
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = { Student };
