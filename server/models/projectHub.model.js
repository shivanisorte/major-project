const mongoose = require('mongoose');


const ProjectHubSchema = new mongoose.Schema({
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
  }

});

const ProjectHub = mongoose.model('Project', ProjectHubSchema);

module.exports = ProjectHub;


