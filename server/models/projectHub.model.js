const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  teamId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
  },
  teamBackground: {
    type: String,
    required: true
  },
  pastProjects: {
    type: String,
    required: true
  },
  projectProposal: {
    type: String,
    required: true
  }
});


const ProjectHubSchema = new mongoose.Schema({
  uploadedBy: {
    type: String,
    required: true
  },
    title: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  contact: {
    type: String,
    required: true
  },
  otherDetails: {
    type: String,
    required: false
  },
  status:{
    type:String,
    required: true
  },
  applications: [{
    type: applicationSchema,
    required: false
  }]

});

const ProjectHub = mongoose.model('Project', ProjectHubSchema);

module.exports = ProjectHub;


