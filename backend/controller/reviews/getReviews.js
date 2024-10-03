const productReviewModel = require("../../models/productReviewsModel");

const getReviewsController = async (req, res) => {
  try {
    const { productId } = req.params;

    const allReviews = await productReviewModel
      .find({ productId })
      .populate("userId", "name profilePic");

    res.json({
      data: allReviews,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getReviewsController;
