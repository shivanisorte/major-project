const mongoose = require("mongoose");
const { Schema } = mongoose;

const formADataSchema = new mongoose.Schema({
  title: String,
  domain: {
    type: String,
    enum: [
      "Artificial Intelligence",
      "Data Science",
      "Web Development",
      "Android Development",
      "IOT",
      "Algorithms",
      "Compilers",
      "Blockchain",
      "Cloudform",
      "Others",
    ],
  },
  technical: String,
  futureScope: String,
  applicability: String,
});

const formASchema = new mongoose.Schema({
  panel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
    },
  ],
  data: [formADataSchema],
});

const TeamSchema = new Schema({
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },
  projectTitle: {
    type: String,
    // required: [true, "project title is required "],
  },
  projectDomain:{
    type: String,
  },
  projectType:{
    type:String,
  },
  commits: [], // not sure what this would look like lmao
  tasks: [], // not sure what this would look like lmao
  domain: {
    type: String,
    // required: true,
  },
  isProjectHubApplied: {
    type: Boolean,
    default: false,
  },
  formA: {
    type: formASchema,
    default: { panel: [], data: [] },
  },
  isFormASubmitted: { type: Boolean, default: false },
  formAApproval: {
    type: Schema.Types.Decimal128,
    default: 0.0,
    validate: {
      validator: function (v) {
        return v < 101;
      },
      message: `All team members have approved formA`,
    },
    max: 101,
  },

  repoLink: {
    type: String,
    required: false
  },

});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
