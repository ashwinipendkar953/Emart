const productModel = require("../../models/productModel");

const getFeaturedProductsController = async (req, res) => {
  try {
    const featuredProducts = await productModel.find({ isFeatured: true });
    res.json({
      message: "Featured products",
      success: true,
      error: false,
      data: featuredProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getFeaturedProductsController;
