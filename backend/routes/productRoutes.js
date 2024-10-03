const express = require("express");
const uploadProductController = require("../controller/products/uploadProduct");
const authToken = require("../middleware/authToken");
const getProductsController = require("../controller/products/getProducts");
const updateProductController = require("../controller/products/updateProduct");
const getSubCategoryWiseProducts = require("../controller/products/getSubCategoryWiseProducts");
const getProductDetails = require("../controller/products/getProductDetails");
const getFeaturedProductsController = require("../controller/products/getFeaturedProducts");
const getNewArrivalsController = require("../controller/products/getNewArrivals");
const addReviewController = require("../controller/reviews/addReview");
const getReviewsController = require("../controller/reviews/getReviews");

const router = express.Router();

// authToken for to use this route only for admin
router.post("/upload", authToken, uploadProductController);

// get products and filtered products
router.get("/", getProductsController);

router.post("/update", authToken, updateProductController);

// featured products
router.get("/featured", getFeaturedProductsController);
router.get("/new-arrivals", getNewArrivalsController);

// subCategory wise products
router.post("/subCategory", getSubCategoryWiseProducts);

// product details
router.post("/details", getProductDetails);

// add review
router.post("/reviews", authToken, addReviewController);
router.get("/reviews/:productId", getReviewsController);

module.exports = router;
