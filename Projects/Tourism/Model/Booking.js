import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      // required: true,
    },
    userId: {
      type: String
    },
    userEmail: {
      type: String,
    },
    tourName:{
        type:String,
        required:true,
    },
    fullName: {
      type: String,
    },
    guestSize:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    bookAt:{
        type:String,
        required:true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema,"Tourism_Booking");