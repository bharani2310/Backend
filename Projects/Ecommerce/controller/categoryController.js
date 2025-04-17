import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js"; 


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    // console.error("Error fetching categories:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add a new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Category name is required" });

    const newCategory = new Category({ name });
    await newCategory.save();
    return res.status(201).json({ success: true, message: "Category added successfully", data: newCategory });
  } catch (error) {
    // console.error("Error adding category:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
// console.log("Cat ",id,name)
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    category.name = name;
    await category.save();
    return res.status(200).json({ success: true, message: "Category updated successfully", data: category });
  } catch (error) {
    // console.error("Error updating category:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log("id",id)
    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Delete products associated with the category
    await Product.deleteMany({ category: id });

    // Now delete the category
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category and associated products deleted successfully",
    });

  } catch (error) {
    // console.error("Error deleting category:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
