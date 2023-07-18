const mongoose = require("mongoose");
const { Schema } = mongoose;
const CoordinatorSchema = new Schema({
  name: { type: String, required: [true, "name is required "] },
  college: { type: String, required: [true, "college is required "] },
  phno: {
    type: Number,
    required: [true, "phone number is required "],
  },
  isStudSubmitted: {
    type: Boolean,
    default: false,
  },
  isGuideSubmitted: {
    type: Boolean,
    default: false,
  },
  phase: {
    type: Number,
    default: 1,
  },
});

const Coordinator = mongoose.model("Coordinator", CoordinatorSchema);

module.exports = Coordinator;
