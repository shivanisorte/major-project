const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail, isMobilePhone } = require("validator");

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
    type: String,
    required: [true, "phone number is required "],
    validate: {
      validator: function (v) {
        return isMobilePhone(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    }

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
    validate: {
      validator: function (v) {
        return v >= 0 && v <= 30;
      },
      message: (props) => `${props.value} is not a valid experience`,
    }
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
