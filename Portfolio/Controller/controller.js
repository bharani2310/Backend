// controllers/allController.js
import skillSchema   from "../Model/skillSchema.js";
import projectSchema from "../Model/projectSchema.js";
import uploadSchema  from "../Model/uploadSchema.js";
import techSchema    from "../Model/techSchema.js";
import JSZip         from "jszip";                // ⬅️ NEW import

export const getPortfolioInfo = async (req, res) => {
  const { imageName } = req.query;

  try {
    const [skills, projects, tech, images] = await Promise.all([
      skillSchema.find({}),
      projectSchema.find({}),
      techSchema.find({}),
      imageName ? uploadSchema.findOne({ name: imageName })
                : uploadSchema.find({})
    ]);

    if (!skills || !projects || !tech || (!images && imageName)) {
      return res.status(404).json({
        success: false,
        message: "One or more resources not found",
      });
    }

    /* ---------- ZIP everything ---------- */
    const zip = new JSZip();
    zip.file("skills.json",   JSON.stringify(skills,   null, 2));
    zip.file("projects.json", JSON.stringify(projects, null, 2));
    zip.file("tech.json",     JSON.stringify(tech,     null, 2));
    zip.file("images.json",   JSON.stringify(images,   null, 2));

    // generate in-memory buffer
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // send the archive
    res
      .status(200)
      .set({
        "Content-Type":        "application/zip",
        "Content-Disposition": 'attachment; filename="portfolio-data.zip"',
        "Content-Length":      zipBuffer.length
      })
      .send(zipBuffer);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Retrieval failed",
      error: err.message,
    });
  }
};
