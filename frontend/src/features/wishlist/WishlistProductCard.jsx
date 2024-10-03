import ProductCardLoader from "../../components/ProductCardLoader";
import { useDispatch, useSelector } from "react-redux";
import { cartResetState, getCartItems } from "../cart/cartSlice";
import { useEffect } from "react";
import { getWishlistProducts, wishlistResetState } from "./wishlistSlice";
import ProductCard from "../../components/ProductCard";

const WishlistProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(cartResetState());
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
    dispatch(wishlistResetState());
  }, [dispatch, isSuccess, isError]);

  return (
    <>
      {isLoading ? (
        <ProductCardLoader />
      ) : (
        <ProductCard product={product} isWishlistCard={true} />
      )}
    </>
  );
};

export default WishlistProductCard;
