import express from 'express';
import { login,register } from '../../controller/tour_controller/authController.js';
import { verifyAdmin, verifyUser } from '../../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking , getBookingsCount, handleCancel,handleUpdate} from '../../controller/tour_controller/bookingController.js';
import {postgalleryImages,putgalleryImages,getGalleryCount, getAllGallery,deleteGallery,GalleryImages,getSingleGalleryImages } from '../../controller/tour_controller/galleryController.js';
import { createReview , getReviewCount} from '../../controller/tour_controller/reviewController.js';
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../../controller/tour_controller/tourController.js';
import { updateUser , deleteUser , getSingleUser , getAllUser, createUser ,getUserCount} from "../../controller/tour_controller/userController.js";

const router = express.Router();

//Authentication
router.post('/register',register);
router.post('/login',login);



//Booking
router.post('/',createBooking)
router.get('/:id',getBooking)
// router.get('/',getAllBooking)
router.delete('/:id',verifyUser,handleCancel)
router.put('/:id',handleUpdate)
router.get('/',getBookingsCount)



//Gallery
router.get("/",GalleryImages);
router.get("/images/:id",getSingleGalleryImages);
router.post('/',postgalleryImages)
router.put('/:id',putgalleryImages)
router.get('/search/getGalleryCount',getGalleryCount);
router.get("/getAll",getAllGallery);
router.delete("/:id",verifyAdmin,deleteGallery);


//Review
router.post('/:id',verifyUser,createReview)
router.get('/',getReviewCount)


//Tour
router.post('/',verifyAdmin,createTour);
router.put("/:id",verifyAdmin,updateTour);
router.delete("/:id",verifyAdmin,deleteTour);
router.get("/:id",getSingleTour);
router.get("/",getAllTour);
router.get('/search/getTourBySearch',getTourBySearch);
router.get('/search/getFeaturedTours',getFeaturedTour);
router.get('/search/getTourCount',getTourCount);


//User
router.post("/",createUser);
router.put("/:id",verifyUser,updateUser);
router.delete("/:id" ,verifyUser,deleteUser);
router.get("/:id", getSingleUser);
router.get("/", getUserCount);
router.get("/" ,getAllUser);

export default router;