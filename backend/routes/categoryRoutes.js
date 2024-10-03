const express = require("express");
const getCategoriesController = require("../controller/categories/getCategories");
const addCategoryController = require("../controller/categories/addCategory");
const updateCategoryController = require("../controller/categories/updateCategory");
const authToken = require("../middleware/authToken");
const deleteCategoryController = require("../controller/categories/deleteCategory");
const getSubCategoriesWithProducts = require("../controller/categories/getSubCategoriesWithProducts");
const router = express.Router();

router.get("/", getCategoriesController);
router.post("/", authToken, addCategoryController);
router.post("/update", authToken, updateCategoryController);
router.delete("/:categoryId", authToken, deleteCategoryController);
router.get("/subcategories-products", getSubCategoriesWithProducts);

module.exports = router;
