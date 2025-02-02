import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    pic: {
      type: String,  
      required: true,  
    },
    project: {
      type: String,
      required: true,
    },
    description: {
        type: String,  
        required: true,  
    },
    url: {
        type: String,
    },
    overview: {
        type: String,
    },
    features: {
        type: String,
    },
    frontend: {
        type: String,
    },
    backend: {
        type: String,
    },
    database: {
        type: String,
    },
    demo: {
        type: String,
    },
    challenges: {
        type: String,
    },
    deployment: { 
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema,"Portfolio_Project");

