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
  
  module.exports = router;
  