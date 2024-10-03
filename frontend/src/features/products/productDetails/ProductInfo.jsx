import { Link, useNavigate } from "react-router-dom";
import { TbHeartFilled, TbHeartPlus } from "react-icons/tb";
import { calculateDiscount, displayINRCurrency } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getCartItems,
  getCountCartItems,
  setIsProductInCart,
} from "../../cart/cartSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  setIsWishlisted,
  wishlistResetState,
} from "../../wishlist/wishlistSlice";
import ProductInfoLoader from "./ProductInfoLoader";
import { productResetState } from "../productSlice";
import { Button, Rating } from "@mui/material";

import QuantityAdjuster from "../../../components/QuantityAdjuster";

const ProductInfo = ({ product, isLoading }) => {
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
  const discount = calculateDiscount(product?.price, product?.sellingPrice);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

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

  const handleAddToCart = (e, productId, quantity) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart({ productId, quantity }));
  };

  return (
    <>
      {isLoading ? (
        <ProductInfoLoader />
      ) : (
        <div className="pe-lg-5 me-lg-5">
          <div className="pe-5 border-bottom-grey">
            <h2 className="card-title m-0">{product?.brandName}</h2>
            <h5 className="card-text text-grey">{product?.name}</h5>
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="half-rating-read"
                value={product?.rating}
                precision={0.5}
                size="small"
                readOnly
              />
              <div
                className="border-start mx-2"
                style={{ height: "1.5rem" }}
              ></div>
              <Link
                className="ms-2 text-dark text-decoration-none"
                to="#reviews-section"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("reviews-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {product?.numReviews === 0
                  ? "No reviews yet"
                  : product?.numReviews > 1
                  ? `${product?.numReviews} reviews`
                  : `${product?.numReviews} review`}
              </Link>
            </div>
          </div>

          <div className="card-text d-flex justify-content-start align-items-center pe-5">
            <p
              className="card-text text-muted fw-light fs-5 me-2 mb-0"
              style={{ fontSize: "18px" }}
            >
              <span className="text-decoration-line-through">
                {displayINRCurrency(product?.price)}
              </span>{" "}
            </p>
            <p className="fw-bold fs-4 me-3 mb-0">
              {displayINRCurrency(product?.sellingPrice)}
            </p>
            {discount > 0 && (
              <p className="text-success fw-bold fs-5 mb-0">
                <span style={{ whiteSpace: "nowrap" }}>({discount}% OFF)</span>
              </p>
            )}
          </div>
          <p className="text-success fw-bold mt-1 mt-0 pt-0 small">
            Inclusive of all taxes
          </p>

          <p className="my-3">
            {product?.description?.split(".").slice(0, 2).join(".") +
              (product?.description?.split(".").length > 2 ? "." : "")}
          </p>

          <div className="d-flex flex-column gap-4 flex-md-row my-4">
            <QuantityAdjuster
              quantity={quantity}
              onQuantityChange={handleQuantityChange} // Pass the callback function
            />

            {isProductInCart ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate("/cart");
                }}
                style={{ minWidth: "250px", height: "48px" }}
                className="btn btn-pink center-content rounded-0  w-100  text-capitalize fw-semibold nav-link"
              >
                View Cart
              </Button>
            ) : (
              <Button
                style={{ minWidth: "250px", height: "48px" }}
                className="btn btn-pink  center-content rounded-0 fw-semibold w-100 "
                onClick={(e) => handleAddToCart(e, product?._id, quantity)}
              >
                Add to cart
              </Button>
            )}
          </div>

          {/* add to wishlist and add to bag Button */}
          <div className="d-grid gap-3 d-md-flex my-4 pe-5 ">
            {isWishlisted ? (
              <Button
                className="btn border text-dark border-1 center-content rounded-0 w-sm-100"
                style={{ minWidth: "250px", height: "48px" }}
                onClick={(e) => handleAddToWishList(e, product?._id)}
              >
                <TbHeartFilled
                  className="text-pink"
                  style={{ fontSize: "24px" }}
                />{" "}
                <span className="mx-2 fw-semibold">Added to Wishlist</span>{" "}
              </Button>
            ) : (
              <Button
                className="btn border text-dark border-1 center-content rounded-0"
                style={{ minWidth: "250px", height: "48px" }}
                onClick={(e) => handleAddToWishList(e, product?._id)}
              >
                <TbHeartPlus style={{ fontSize: "24px" }} />{" "}
                <span className="mx-2 fw-semibold">Add to Wishlist</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
