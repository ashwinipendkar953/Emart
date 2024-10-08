import React, { useState } from "react";
import { displayINRCurrency } from "../../utils/helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalDiscount,
  calculateTotalMRP,
  calculateTotalPrice,
  calculateTotalQuantity,
  clearCart,
} from "./cartSlice";
import CartSummaryLoader from "./CartSummaryLoader";
import { addOrder } from "../orders/orderSlice";
import { toast } from "react-toastify";

const CartSummary = ({ cartItems, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalQuantity, totalPrice, totalMRP, totalDiscount } = useSelector(
    (state) => state.cart
  );
  const { checkoutAddress } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState("online"); 


  const handlePayment = () => {
    if (checkoutAddress === null || checkoutAddress === undefined) {
      toast.error("Please add an address before proceeding with payment.");
      return; // Exit the function to prevent payment initialization
    }

    if(paymentMethod === "online"){
      var options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        key_secret: import.meta.env.VITE_RAZORPAY_SECRET,
        amount: parseInt(totalPrice * 100),
        currency: "INR",
        order_receipt: "order_receiptId_" + checkoutAddress?.fullName,
        name: "Emart",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        handler: function (response) {
          const paymentId = response.razorpay_payment_id;
          const payload = {
            name: checkoutAddress?.fullName,
            phoneNumber: checkoutAddress?.mobileNo,
            address: `${checkoutAddress?.address} ${checkoutAddress?.town} ${checkoutAddress?.district} ${checkoutAddress?.state}`,
            pincode: checkoutAddress?.pincode,
            amount: totalPrice,
            paymentId: paymentId,
            userId: checkoutAddress?.userId,
            products: cartItems,
            paymentMethod: "online"
          };
  
          dispatch(addOrder(payload)).then(() => {
            dispatch(clearCart());
            navigate("/");
          });
        },
  
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    } else if (paymentMethod === "cod") {
      const payload = {
        name: checkoutAddress?.fullName,
        phoneNumber: checkoutAddress?.mobileNo,
        address: `${checkoutAddress?.address} ${checkoutAddress?.town} ${checkoutAddress?.district} ${checkoutAddress?.state}`,
        pincode: checkoutAddress?.pincode,
        amount: totalPrice,
        paymentId: "COD",
        userId: checkoutAddress?.userId,
        products: cartItems,
        paymentMethod: "cod",
      };
  
      dispatch(addOrder(payload)).then(() => {
        dispatch(clearCart());
        navigate("/");
        toast.success("Order placed with Cash on Delivery.");
      });
    }
    
  };

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateTotalPrice());
    dispatch(calculateTotalDiscount());
    dispatch(calculateTotalMRP());
  }, [dispatch, cartItems]);
  return (
    <div>
      {isLoading ? (
        <CartSummaryLoader />
      ) : (
        <div className="card h-100 bg-white" style={{ height: "10rem" }}>
          <div className="card-body">
            <h5 className="card-title fw-bold">Order Summary</h5>
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total Items </p>
                <p className="mb-0">{cartItems?.length}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total Quantity </p>
                <p className="mb-0">{totalQuantity}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total MRP </p>
                <p className="mb-0">{displayINRCurrency(totalMRP)}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Discount on MRP </p>
                <p className="mb-0">{displayINRCurrency(totalDiscount)}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 fs-5 fw-bold">Order Total:</p>
              <p className="mb-0 fs-5 fw-bold">
                {displayINRCurrency(totalPrice)}
              </p>
            </div>
            <hr className="mx-4" />

              {/* Payment Options */}
           <div className="mb-3">
            <h6 className="fs-5 fw-bold">Select Payment Method:</h6>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="onlinePayment"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              <label className="form-check-label" htmlFor="onlinePayment">
                Online Payment (Razorpay)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <label className="form-check-label" htmlFor="cashOnDelivery">
                Cash on Delivery (COD)
              </label>
            </div>
          </div>
          </div>

         

          <div className="card-footer ">
            <button
              className="btn text-teal fw-bold text-uppercase w-100"
              onClick={handlePayment}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
