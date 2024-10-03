const express = require("express");
const authToken = require("../middleware/authToken");
const addOrderController = require("../controller/orders/addOrder");
const getOrdersController = require("../controller/orders/getOrders");
const getOrderByIdController = require("../controller/orders/getOrderById");

const router = express.Router();

// authToken for to use this route only for admin
router.post("/", authToken, addOrderController);

router.get("/", authToken, getOrdersController);

router.get("/:orderId", authToken, getOrderByIdController);

module.exports = router;
