import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Skill",
    },
    pic: {
      type: String,  
      required: true,  
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,  
      required: true,  
    },
    description: {
        type: String,  
        required: true,  
    },
    start: {
        type: Date,
        required: true,
    },
      end: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema,"Portfolio_Experience");

