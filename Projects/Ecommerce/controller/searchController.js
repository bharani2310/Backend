import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

export const searchItems = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ items: [] });

    // console.log("Query:", q);

    // Find categories matching the search term
    const categories = await Category.find({
      name: { $regex: q, $options: "i" },
    });

    // Find products matching the search term
    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    }).select("_id name price stock imageBase64 unit actualWeight categoryId");

    const results = [];

    // For each matched category, manually find its products
    for (const category of categories) {
      const categoryProducts = await Product.find({
        categoryId: category._id,
      }).select("_id name price stock imageBase64 unit actualWeight");

      results.push({
        _id: category._id,
        name: category.name,
        type: "category",
        products: categoryProducts,
      });
    }

    // Exclude products that were already added under a category
    const productIdsFromCategories = new Set(
      results.flatMap((cat) => cat.products.map((p) => p._id.toString()))
    );

    const standaloneProducts = products.filter(
      (p) => !productIdsFromCategories.has(p._id.toString())
    );

    // Add standalone products
    standaloneProducts.forEach((product) => {
      results.push({
        _id: product._id,
        name: product.name,
        type: "product",
        price: product.price,
        stock: product.stock,
        imageBase64: product.imageBase64,
        unit: product.unit,
        actualWeight: product.actualWeight,
      });
    });

    // console.log("Final Results:", results);
    return res.json({ items: results });
  } catch (error) {
    // console.error("Search Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
