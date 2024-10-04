import { calculateDiscount, displayINRCurrency } from "../utils/helpers";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"; // Import filled heart icon
import ProductSlideshow from "./ProductSlideshow";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

import {
  addItemToCart,
  cartResetState,
  getCartItems,
  getCountCartItems,
} from "../features/cart/cartSlice";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  removeFromWishlistProduct,
  wishlistResetState,
} from "../features/wishlist/wishlistSlice";
import ProductModal from "./productModal/ProductModal";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllProductReviews } from "../features/products/productSlice";

const ProductCard = ({ product, isWishlistCard }) => {
  const navigate = useNavigate();
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isWishlistProductCard, setIsWishlistProductCard] = useState(false);

  const dispatch = useDispatch();
  const { message, isSuccess, isError, cartItems } = useSelector(
    (state) => state?.cart
  );
  const {
    message: wMessage,
    isSuccess: wSuccess,
    isError: wError,
    wishlistProducts,
  } = useSelector((state) => state?.wishlist);

  const discount = calculateDiscount(product?.price, product?.sellingPrice);

  useEffect(() => {
    setIsWishlistProductCard(isWishlistCard);
  }, [isWishlistCard]);

  const [localIsWishlisted, setLocalIsWishlisted] = useState(false);
  const [localIsInCart, setLocalIsInCart] = useState(false);

  useEffect(() => {
    if (product?._id) {
      const isProductInWishlist = wishlistProducts?.some(
        (item) => item.productId?._id === product?._id
      );
      setLocalIsWishlisted(isProductInWishlist);

      const isInCart = cartItems?.some(
        (item) => item.productId?._id === product?._id
      );
      setLocalIsInCart(isInCart);
    }
  }, [product, wishlistProducts, cartItems]);

  const viewProductDetails = () => {
    setIsOpenProductModal(true);
  };

  const closeProductModal = () => {
    setIsOpenProductModal(false);
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
    dispatch(cartResetState());
    dispatch(wishlistResetState());
  }, [message, isSuccess, isError, wMessage, wSuccess, wError, dispatch]);

  useEffect(() => {
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
    dispatch(fetchAllProductReviews());
  }, [dispatch, isSuccess, isError]);

  const handleRemoveFromWishList = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeFromWishlistProduct(productId)).then(() => {
      dispatch(setLocalIsWishlisted(false));
      dispatch(getWishlistProducts());
    });
  };

  const handleAddToWishList = (e, productId) => {
    e.preventDefault();
    dispatch(addProductToWishlist(productId)).then(() => {
      setLocalIsWishlisted(true);
      dispatch(getCountWishlistProducts());
    });
  };

  const handleAddToCart = (e, productId) => {
    const quantity = 1;
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart({ productId, quantity })).then(() => {
      setLocalIsInCart(true);
      dispatch(getCountCartItems());
    });
  };

  // console.log(product);

  return (
    <>
      <Link
        className="text-decoration-none nav-link"
        to={`/products/details/${product?._id}`}
      >
        <div className="card h-100 rounded-0" style={{minWidth: "16rem", width: "100%"}}>
          <div className="card-img-top">
            <div className="product-images position-relative">
              {discount > 0 && (
                <div className="product-badges position-absolute">
                  <p className="text-center">{discount}%</p>
                </div>
              )}
              <div className="product-card-actions">
                {isWishlistProductCard ? (
                  <Button
                    onClick={(e) => handleRemoveFromWishList(e, product?._id)}
                  >
                    <RxCross1 size={20} />
                  </Button>
                ) : (
                  <Button onClick={(e) => handleAddToWishList(e, product?._id)}>
                    {localIsWishlisted ? (
                      <IoMdHeart size={20} />
                    ) : (
                      <IoMdHeartEmpty size={20} />
                    )}
                  </Button>
                )}

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    viewProductDetails(product?.id);
                  }}
                >
                  <TfiFullscreen size={18} />
                </Button>
              </div>

              <ProductSlideshow
                images={product?.images}
                category={product?.category}
              />
            </div>
          </div>
          <div className="card-body">
            <div className="product-details">
              <div className="product-rating d-flex justify-content-between align-items-center">
                <Rating
                  className="mt-2"
                  name="half-rating-read"
                  value={product?.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                {product?.numReviews > 0 && (
                  <span>
                    {" "}
                    {product?.numReviews > 1
                      ? `${product?.numReviews} reviews`
                      : `${product?.numReviews} review`}
                  </span>
                )}
              </div>
              <p className="product-name text-truncate mb-0">{product?.name}</p>

              <div className="product-price d-flex d-grid gap-2">
                <span className="original-price text-secondary text-decoration-line-through">
                  {displayINRCurrency(product?.price)}
                </span>
                <span className="selling-price fw-bold">
                  {displayINRCurrency(product?.sellingPrice)}
                </span>
              </div>
              <div className="add-to-cart-action">
                {localIsInCart ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      navigate("/cart");
                    }}
                    className="btn btn-pink rounded-0 mt-2 py-2 w-100 fw-semibold nav-link"
                  >
                    View Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-pink rounded-0 mt-2 w-100 fw-semibold"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {isOpenProductModal && (
        <ProductModal product={product} closeProductModal={closeProductModal} />
      )}
    </>
  );
};

export default ProductCard;
