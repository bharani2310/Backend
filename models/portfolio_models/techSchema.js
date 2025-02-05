import mongoose from "mongoose";

const techSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tech",
    },
    pic: {
      type: String,  
      required: true,  
    },
    tech: {
      type: String,
      required: true,
    },
    category: {
      type: String,  
      required: true,  
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tech", techSchema,"Portfolio_Technology");

