const productModel = require("../../models/productModel");

// Controller to get the 6 newest products
const getNewArrivalsController = async (req, res) => {
  try {
    const newArrivals = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(6);
    res.json({
      message: "New arrivals products",
      success: true,
      error: false,
      data: newArrivals,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getNewArrivalsController;
