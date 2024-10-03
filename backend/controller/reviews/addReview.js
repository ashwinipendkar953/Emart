const productReviewModel = require("../../models/productReviewsModel");
const productModel = require("../../models/productModel");

async function addReviewController(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Please log in to add a review.",
      });
    }

    const { productId, review, rating, headline } = req.body;

    const newReview = new productReviewModel({
      productId,
      userId,
      headline,
      review,
      rating,
    });

    const savedReview = await newReview.save();

    const currentReviewCount = await productReviewModel.countDocuments({
      productId,
    });

    await productModel.findByIdAndUpdate(
      productId,
      { numReviews: currentReviewCount },
      { new: true }
    );

    const populatedReview = await productReviewModel
      .findById(savedReview._id)
      .populate("userId", "name profilePic");

    res.status(201).json({
      data: populatedReview,
      success: true,
      error: false,
      message: "Review added successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addReviewController;
