const ProjectHub = require("../models/projectHub.model");
const express = require("express");
const router = express.Router();
 
router.get("/", (req, res) => {
    
});

router.post("/", async (req, res) => {
    const{
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
  