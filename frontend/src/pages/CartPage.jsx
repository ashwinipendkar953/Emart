import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../features/cart/cartSlice";
import CartItems from "../features/cart/CartItems";
import CartSummary from "../features/cart/CartSummary";
import ChooseAddress from "../features/cart/ChooseAddress";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div className="">
      {cartItems?.length === 0 && (
        <div className="container-fluid px-4 py-4 text-center my-5 bg-white">
          <div className="bg-white p-4 rounded shadow">
            <h6 className="display-6 fw-semibold">Your Cart is Empty</h6>
            <p>
              Looks like you haven't added any products to your cart yet. Start
              shopping now to fill your cart!
            </p>
            <p>
              Don't forget to check your{" "}
              <Link to="/wishlist" className="text-pink">
                wishlist
              </Link>{" "}
              for items you might want to purchase later!
            </p>
            <p className="mb-0">
              <Link to="/products" className="btn btn-pink">
                Shop Now
              </Link>
            </p>
          </div>
        </div>
      )}

      {cartItems.length !== 0 && (
        <div className="container-fluid px-4 py-4 bg-slate-200">
          <div className="row g-4 ">
            <div className="col-lg-8">
              <CartItems cartItems={cartItems} isLoading={isLoading} />
            </div>
            <div className="col-lg-4 ">
              <div className="d-flex flex-column gap-4">
                <ChooseAddress />
                <CartSummary cartItems={cartItems} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
