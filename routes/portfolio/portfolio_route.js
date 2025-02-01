import express from 'express';
import {uploadImage,getSkill,getImage,createSkill,updateSkill,deleteSkill} from "../../controller/portfolio_controller/portfolio_controller.js"


const router = express.Router();


router.post("/upload",uploadImage);
router.get("/getImage",getImage);
router.get("/getSkill/all",getSkill);
router.post("/createSkill/newSkill",createSkill)
router.put('/updateSkill/:id',updateSkill)
router.delete('/deleteSkill/:id',deleteSkill)

export default router;