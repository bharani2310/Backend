import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// Export model with custom collection name: EComm_Categories 
export default mongoose.model("Category", categorySchema, "EComm_Categories");
