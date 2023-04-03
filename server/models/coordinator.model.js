const mongoose = require("mongoose");
const { Schema } = mongoose;
const CoordinatorSchema = new Schema({
  name: { type: String, required: [true, "name is required "] },
  college: { type: String, required: [true, "college is required "] },
  phno: {
    type: Number,
    required: [true, "phone number is required "],
  },
});

const Coordinator = mongoose.model("Coordinator", CoordinatorSchema);

module.exports = Coordinator;
