const express = require("express");
const authToken = require("../middleware/authToken");
const addItemToCartController = require("../controller/cart/addItemTocart");
const countCartItems = require("../controller/cart/countCartItems");
const getCartItemsController = require("../controller/cart/getCartItems");
const updateCartItemController = require("../controller/cart/updateCartItem");
const deleteCartItemController = require("../controller/cart/deleteCartItem");
const clearCartController = require("../controller/cart/clearCart");
const router = express.Router();

// user add to cart
router.post("/add-item", authToken, addItemToCartController);
router.get("/count-items", authToken, countCartItems);
router.get("/items", authToken, getCartItemsController);
router.get("/clear", authToken, clearCartController);

router.post("/update-item", authToken, updateCartItemController);
router.post("/delete-item", authToken, deleteCartItemController);

module.exports = router;
