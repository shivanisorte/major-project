const mongoose = require("mongoose");
const { Schema } = mongoose;

const guideSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required "],
  },
  phno: {
    type: Number,
    required: [true, "phone number is required "],
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

  specialization: {
    type: [String],
    required: true,
    enum: ["WEB", "ML", "AR/VR", "UI/UX"],
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

const Guide = mongoose.model("Guide", guideSchema);
module.exports = Guide;
