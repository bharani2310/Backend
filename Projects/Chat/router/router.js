import express from 'express'
import {registerUser,checkEmail,checkPassword, userDetails, logout, updateUserDetails, SearchUser, getUserDetails, getMessage} from '../controller/userController.js';


const router=express.Router()

router.post('/register',registerUser)
router.post('/email',checkEmail)
router.post('/password',checkPassword) 
router.get('/user-details',userDetails)
router.get('/getUser',getUserDetails)
router.get('/getMessage',getMessage)
router.get('/logout',logout)
router.put('/update-user',updateUserDetails)
router.post('/search-user',SearchUser)
 
export default router;   