const orderModel = require("../../models/orderModel");

async function addOrderController(req, res) {
  try {
    const sessionUserId = req.userId;

    // console.log(req.body.products);

    const payload = {
      name: req.body?.name,
      phoneNumber: req.body?.phoneNumber,
      address: req.body?.address,
      pincode: req.body?.pincode,
      amount: req.body?.amount,
      paymentId: req.body?.paymentId,
      userId: sessionUserId,
      products: req.body?.products,
      paymentMethod: req.body?.paymentMethod,
      date: req.body?.date,
    };

    const order = new orderModel(payload);
    const savedOrder = await order.save();

    if (!savedOrder) {
      return res.status(500).json({
        message: "Error saving the order",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: savedOrder,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addOrderController;
