const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    brandName: String,
    category: String,
    subCategory: String,
    images: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    rating: Number,
    countInStock: {
      type: Number,
      default: 5,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
