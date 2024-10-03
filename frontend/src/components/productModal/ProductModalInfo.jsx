import React, { useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import { displayINRCurrency } from "../../utils/helpers";
import QuantityAdjuster from "../QuantityAdjuster";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getCartItems,
  setIsProductInCart,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productResetState } from "../../features/products/productSlice";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  setIsWishlisted,
  wishlistResetState,
} from "../../features/wishlist/wishlistSlice";

const ProductModalInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, isSuccess, isError, cartItems, isProductInCart } =
    useSelector((state) => state.cart);
  const {
    message: wMessage,
    isSuccess: wSuccess,
    isError: wError,
    isWishlisted,
    wishlistProducts,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isSuccess || wSuccess) {
      toast.success(message || wMessage, {
        toastId: "success",
      });
    } else if (isError || wError) {
      toast.error(message || wMessage, {
        toastId: "error",
      });
    }
    dispatch(productResetState());
    dispatch(wishlistResetState());
  }, [message, isSuccess, isError, wMessage, wSuccess, wError, dispatch]);

  useEffect(() => {
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
    dispatch(wishlistResetState());
  }, [dispatch]);

  // Determine if the current product is in the wishlist
  useEffect(() => {
    if (product?._id && wishlistProducts?.length > 0) {
      const isProductInWishlist = wishlistProducts.some(
        (item) => item.productId?._id === product?._id
      );
      dispatch(setIsWishlisted(isProductInWishlist));

      const isInCart = cartItems.some(
        (item) => item.productId?._id === product?._id
      );
      dispatch(setIsProductInCart(isInCart));
    }
  }, [dispatch, product, wishlistProducts, cartItems]);

  const handleAddToWishList = (e, productId) => {
    e.preventDefault();
    dispatch(addProductToWishlist(productId)).then(() => {
      dispatch(setIsWishlisted(true));
      dispatch(getCountWishlistProducts());
    });
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = (e, productId, quantity) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart({ productId, quantity }));
  };

  return (
    <>
      <h4 className="mb-2  fw-bold">{product?.name}</h4>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center py-1">
          <span>Brand:</span>
          <span className="ml-2 fw-bold">{product?.brandName}</span>
        </div>
        <div className="border-start mx-2" style={{ height: "1.5rem" }}></div>

        <Rating
          name="half-rating-read"
          value={product?.rating}
          precision={0.5}
          size="small"
          readOnly
        />
        <span className="ms-2">
          {product?.numReviews > 0 ? product?.numReviews : 2} reviews
        </span>
      </div>

      <div className="product-price d-flex fs-5 d-grid gap-3 align-items-center">
        <span className="original-price text-secondary text-decoration-line-through">
          {displayINRCurrency(product?.price)}
        </span>
        <span className="selling-price fw-bold">
          {displayINRCurrency(product?.sellingPrice)}
        </span>
      </div>

      <p className="my-3">
        {product?.description?.split(".").slice(0, 2).join(".") +
          (product?.description?.split(".").length > 2 ? "." : "")}
      </p>
      <div className="my-3 fw-semibold">
        {product?.countInStock > 0 ? (
          <span className="badge-success p-2">In stock</span>
        ) : (
          <span className="badge bg-danger rounded-0 p-2 my-2">
            Out of stock
          </span>
        )}
      </div>
      <div className="d-flex align-items-center my-4">
        <QuantityAdjuster
          quantity={quantity}
          onQuantityChange={handleQuantityChange} // Pass the callback function
        />
        {isProductInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate("/cart");
            }}
            className="w-auto ms-4 btn btn-pink px-5 py-2 rounded-pill text-capitalize fw-semibold nav-link"
          >
            View Cart
          </button>
        ) : (
          <Button
            className="w-auto ms-4 btn btn-pink px-5 text-capitalize rounded-0"
            style={{ padding: "10px 0" }}
            onClick={(e) => handleAddToCart(e, product?._id, quantity)}
          >
            Add to cart
          </Button>
        )}
      </div>
      <div className="d-flex actions align-items-center my-4">
        {isWishlisted ? (
          <Button
            className="text-dark border-dark py-2 rounded-0 text-capitalize  d-flex align-items-center"
            variant="outlined"
            onClick={(e) => handleAddToWishList(e, product?._id)}
          >
            <IoIosHeart size={20} />
            <span className="ms-2">Added to wishlist</span>
          </Button>
        ) : (
          <Button
            className="text-dark border-dark py-2  rounded-0 text-capitalize  d-flex align-items-center"
            variant="outlined"
            onClick={(e) => handleAddToWishList(e, product?._id)}
          >
            <IoIosHeartEmpty size={20} />
            <span className="ms-2">Add to wishlist</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductModalInfo;
