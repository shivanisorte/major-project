const mongoose = require("mongoose");
const { Schema } = mongoose;

const guideSchema = Schema({
  empid: {
    type: String,
    required: [true, "employee id is required "],
  },

  name: {
    type: String,
    required: [true, "name is required "],
  },

  phno: {
    type: Number,
    required: [true, "phone number is required "],
    validate: {
      validator: function (v) {
        const re = /^\d{10}$/;
        return re.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },

  email: {
    type: String,
    unique: true,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email id!`,
    // },
  },

  domain: {
    type: String,
    required: true,
    enum: [
      "Artificial Intelligence",
      "Data Science",
      "Web Development",
      "Android Development",
      "IOT",
      "Algorithms",
      "Compilers",
      "Blockchain",
      "Cloud",
      "Others",
    ],
  },
  experienceYrs: {
    type: Number,
    required: true,
  },
  bachelors: {
     type: Boolean,
     required: true,
  },
  masters: {
    type: Boolean,
    required: true,
  },
  phd: {
    type: Boolean,
    required: true,
  },
  postPhd: {
    type: Boolean,
    required: true,
  },

  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

const Guide = mongoose.model("Guide", guideSchema);
module.exports = Guide;
