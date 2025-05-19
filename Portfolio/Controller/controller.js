// controllers/allController.js
import skillSchema   from "../Model/skillSchema.js";
import projectSchema from "../Model/projectSchema.js";
import uploadSchema  from "../Model/uploadSchema.js";
import techSchema    from "../Model/techSchema.js";

export const getPortfolioInfo = async (req, res) => {
  const { imageName } = req.query;

  try {
    const [skills, projects, tech, images] = await Promise.all([
      skillSchema.find({}),
      projectSchema.find({}),
      techSchema.find({}),
      imageName
        ? uploadSchema.findOne({ name: imageName })
        : uploadSchema.find({})
    ]);

    if (!skills || !projects || !tech || (!images && imageName)) {
      return res.status(404).json({
        success: false,
        message: "One or more resources not found",
      });
    }

    const result = {
      skills,
      projects,
      tech,
      images,
    };

    res.status(200).json({
      success: true,
      message: "Portfolio data retrieved successfully",
      data: result,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Retrieval failed",
      error: err.message,
    });
  }
};
