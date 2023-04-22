const ProjectHub = require("../models/projectHub.model");
const express = require("express");
const router = express.Router();
 
router.get("/", async (req, res) => {
    try {
        const projects = await ProjectHub.find();
        res.status(200).json({projects,success:true});
    } catch (error) {
        console.error('Error getting projects:', error);
        res.status(500).json({ message: 'Server error ' + error.message, success:false });
    }
});

router.post("/", async (req, res) => {
    const{
        uploadedBy,
        title,
        projectType,
        domain,
        description,
        technologies,
        contact,
        otherDetails, 
        status
    } =  req.body;

    try{
        const project = new ProjectHub({
            uploadedBy,
            title,
            projectType,
            domain,
            description,
            status,
            technologies,
            contact,
            otherDetails
        });

        const projectResp = await project.save();
        if (projectResp){
            return res.json({message:"Added to Project Hub successfully", success: true}).status(200);
        }

        res.json({message: "Couldn't add project to DB", success:false}).status(500)
    
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error' + error.message, success: false });
    }


});

    router.put('/:id', async (req, res) => {
        const projectId = req.params.id;
        const { title, projectType, domain, description, technologies, contact, otherDetails, status } = req.body;
    
        try {
        const project = await ProjectHub.findByIdAndUpdate(projectId, { title, projectType, domain, description, technologies, contact, otherDetails, status }, { new: true });
        res.json(project);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    });

    router.delete('/:id', async (req, res) => {
      
        try {
          const project = await ProjectHub.findByIdAndDelete(req.params.id);
          res.json(project);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });


      router.post('/addapplication/:id', async (req, res) => {
        try {
          const projectId = req.params.id;
          const { teamId, teamBackground, pastProjects, projectProposal } = req.body;
      
          // Create a new application object
          const application = {
            teamId,
            teamBackground,
            pastProjects,
            projectProposal
          };
      
          // Find the project by ID and push the new application to its `applications` array
          const project = await ProjectHub.findByIdAndUpdate(
            projectId,
            { $push: { applications: application } },
            { new: true }
          );
      
          res.status(200).json(project);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      });


  
  module.exports = router;
  