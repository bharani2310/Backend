import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title:{
        type: String,
        required:true,
    },
    genre:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema,"Tourism_Gallery");