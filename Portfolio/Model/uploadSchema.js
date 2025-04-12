import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Name",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,  
      required: true,  
    }
  },
  { timestamps: true }
);

export default mongoose.model("Name", uploadSchema,"Portfolio_Assets");
