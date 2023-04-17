const express = require("express");
const router = express.Router();
const getEntity = require("../utils/getEntity");
const createToken = require("../utils/createToken");

router.post("/", async (req, res) => {
    try{
        const { phno, entity } = req.body;
        const {success} = await getEntity(phno, entity);
        if(success === true){
            const token = createToken(phno);
            res.cookie("token", token);
            console.log("token: ", token);
            res.status(200).json({ success: true, message: entity + " found, token sent!" });
        } else {
            res.status(404).json({
                success: false,
                message: entity.toLowerCase() + " is not registered!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;