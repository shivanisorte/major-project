const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    required: [true, "project title is required "],
  },
  commits: [], // not sure what this would look like lmao
  tasks: [], // not sure what this would look like lmao
  domain: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = { Team };
