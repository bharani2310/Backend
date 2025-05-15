import express from 'express';
import {verifyLogin,uploadImage,getSkill,getImage,createSkill,updateSkill,deleteSkill,createProject,getProject,
    getSingleProject,updateProject,deleteProject,createTech,getTech,updateTech,deleteTech} from "../Controller/portfolio_controller.js"
import {getPortfolioInfo} from '../Controller/controller.js'


const router = express.Router();

//Summary of All Get request
router.get('/getAll',getPortfolioInfo)

//Login
router.post('/login',verifyLogin);

//image
router.post("/upload",uploadImage);
router.get("/getImage",getImage);

//project
router.post("/createProject",createProject);
router.get("/getProject/all",getProject);
router.get("/getProject/:id",getSingleProject);
router.put("/updateProject/:id",updateProject);
router.delete('/deleteProject/:id',deleteProject)


//skill
router.get("/getSkill/all",getSkill);
router.post("/createSkill/newSkill",createSkill)
router.put('/updateSkill/:id',updateSkill)
router.delete('/deleteSkill/:id',deleteSkill)


//Tech
router.post("/createTech/newTech",createTech)
router.get("/getTech/all",getTech);
router.put('/updateTech/:id',updateTech)
router.delete('/deleteTech/:id',deleteTech)

export default router;