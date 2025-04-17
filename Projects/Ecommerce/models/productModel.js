import mongoose from "mongoose";
  

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      enum: ["kg", "litre"],
      default: "kg",
      required: true,
    },
    actualWeight: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// Export with explicit collection name: EComm_Products
export default mongoose.model("Product", productSchema, "EComm_Products");
