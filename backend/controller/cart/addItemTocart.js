const cartModel = require("../../models/cartModel");

const addItemToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const currentUser = req.userId;

    if (!productId) {
      return res.status(400).json({
        message: "Please select product.",
        success: false,
        error: true,
      });
    }

    const validatedQuantity = Number(quantity);
    if (isNaN(validatedQuantity) || validatedQuantity <= 0) {
      return res.status(400).json({
        message: "Please select a valid quantity.",
        success: false,
        error: true,
      });
    }

    // Check if the product is already in the cart for the current user
    const isProductInCart = await cartModel.findOne({
      productId: productId,
      userId: currentUser,
    });

    if (isProductInCart) {
      return res.json({
        message: "Product is already in the cart.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: validatedQuantity,
      userId: currentUser,
    };

    const newCartItem = new cartModel(payload);

    const savedCartItem = await newCartItem.save();

    return res.json({
      data: savedCartItem,
      message: "Product added to cart!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Error adding product to cart.",
      error: true,
      success: false,
    });
  }
};

module.exports = addItemToCartController;
