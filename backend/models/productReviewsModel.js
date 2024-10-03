const mongoose = require("mongoose");

const User = require("./userModel");

const productReviewsSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
    default: "",
  },
  rating: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productReviewModel = mongoose.model(
  "productReview",
  productReviewsSchema
);

module.exports = productReviewModel;
