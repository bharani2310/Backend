import express from 'express';
import {uploadImage,getSkill,getImage,createSkill,updateSkill,deleteSkill,createProject,getProject} from "../../controller/portfolio_controller/portfolio_controller.js"


const router = express.Router();

//image
router.post("/upload",uploadImage);
router.get("/getImage",getImage);

//project
router.post("/createProject",createProject);
router.get("/getProject/all",getProject);

//skill
router.get("/getSkill/all",getSkill);
router.post("/createSkill/newSkill",createSkill)
router.put('/updateSkill/:id',updateSkill)
router.delete('/deleteSkill/:id',deleteSkill)

export default router;