import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// Get all products with their categories
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId'); // Populate the category field
    // console.log("1",products)
    res.json(products);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("heee",id)
    const product = await Product.findById(id).populate('categoryId'); // Include category details
    // console.log("2",product)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    // console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new product 
export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId, imageBase64, unit, actualWeight } = req.body;

    // console.log("Category ID:", categoryId);

    // Validate required fields
    if (!name || !price || !stock || !categoryId || !imageBase64 || !unit || !actualWeight) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      // console.log(category)
      return res.status(400).json({ message: "Category not found" });
    }

    // Create the product object
    const product = new Product({
      name,
      price,
      stock,
      categoryId: categoryId,  // Store as ObjectId
      imageBase64,
      unit,
      actualWeight
    });

    // Save the product
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    // console.error("Error adding product:", error);
    return res.status(500).json({ message: "Error saving product", error: error.message });
  }
};


// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, categoryId, imageBase64, unit, actualWeight } = req.body;
    // console.log("Update",categoryId,id)
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.categoryId = categoryId || product.categoryId;  
    product.imageBase64 = imageBase64 || product.imageBase64;
    product.unit = unit || product.unit;
    product.actualWeight = actualWeight || product.actualWeight;

    await product.save();
    res.json(product);
  } catch (error) {
    // console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    // console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const categoriesWithProducts = await Category.aggregate([
      {
        $lookup: {
          from: "EComm_Products", // Collection name (should match what's in your Product model export)
          localField: "_id",
          foreignField: "categoryId",
          as: "products"
        }
      },
      {
        $match: {
          "products.0": { $exists: true } // Filters to include only categories that have at least one product
        }
      }
    ]);
    res.json(categoriesWithProducts);
  } catch (error) {
    // console.error("Error fetching categories with products:", error);
    res.status(500).json({ message: error.message });
  }
};

