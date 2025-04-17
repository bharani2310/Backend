import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    imageBase64: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false, // Set to true if you want createdAt/updatedAt
  }
);

// Export model with custom collection name: EComm_Cart
export default mongoose.model("Cart", cartSchema, "EComm_Cart");
     