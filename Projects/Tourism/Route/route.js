import express from 'express';
import { login,register } from '../Controller/authController.js';
import { createBooking, getAllBooking, getBooking , getBookingsCount, handleCancel,handleUpdate} from '../Controller/bookingController.js';
import {postgalleryImages,putgalleryImages,getGalleryCount, getAllGallery,deleteGallery,GalleryImages,getSingleGalleryImages } from '../controller/galleryController.js';
import { createReview , getReviewCount} from '../controller/reviewController.js';
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controller/tourController.js';
import { updateUser , deleteUser , getSingleUser , getAllUser, createUser ,getUserCount} from "../controller/userController.js";

const   router = express.Router();

//Authentication
router.post('/auth/register',register);
router.post('/auth/login',login);



//Booking
router.post('/booking/',createBooking)
router.get('/booking/:id',getBooking)
// router.get('/booking/',getAllBooking)
router.delete('/booking/:id',handleCancel)
router.put('/booking/:id',handleUpdate)
router.get('/booking/',getBookingsCount)



//Gallery
router.get("/gallery/",GalleryImages);
router.get("/gallery/images/:id",getSingleGalleryImages);
router.post('/gallery',postgalleryImages)
router.put('/gallery/:id',putgalleryImages)
router.get('/gallery/search/getGalleryCount',getGalleryCount);
router.get("/gallery/getAll",getAllGallery);
router.delete("/gallery/:id",deleteGallery);


//Review
router.post('/review/:id',createReview)
router.get('/review/',getReviewCount)


//Tour
router.post('/tours',createTour);
router.put("/tours/:id",updateTour);
router.delete("/tours/:id",deleteTour);
router.get("/tours/:id",getSingleTour);
router.get("/tours/",getAllTour);
router.get('/tours/search/getTourBySearch',getTourBySearch);
router.get('/tours/search/getFeaturedTours',getFeaturedTour);
router.get('/tours/search/getTourCount',getTourCount);


//User
router.post("/users/",createUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id" ,deleteUser);
router.get("/users/:id", getSingleUser);
router.get("/users/", getUserCount);
router.get("/users/" ,getAllUser);

export default router;