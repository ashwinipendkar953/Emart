
const productModel = require("../../models/productModel");

const getProductsController = async (req, res) => {
  try {
    const products = await productModel.find().sort({createdAt: -1});

    res.json({
      message: "Products",
      success: true,
      error: false,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductsController;
