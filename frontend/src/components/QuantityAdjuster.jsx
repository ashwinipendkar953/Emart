import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "@mui/material";

const QuantityAdjuster = ({ quantity, onQuantityChange }) => {
  const [inputVal, setInputVal] = useState(quantity || 1);

  const increaseQtyHandler = () => {
    const updatedQuantity = inputVal + 1;
    setInputVal(updatedQuantity);
    onQuantityChange(updatedQuantity);
  };

  const decreaseQtyHandler = () => {
    const updatedQuantity = inputVal > 1 ? inputVal - 1 : 1; // Prevent negative quantity
    setInputVal(updatedQuantity);
    onQuantityChange(updatedQuantity);
  };

  return (
    <div className="quantityAdjuster d-flex align-items-center">
      <Button onClick={decreaseQtyHandler}>
        <FaMinus />
      </Button>
      <input
        type="text"
        value={inputVal}
        readOnly
        style={{ width: "3rem", textAlign: "center" }}
      />
      <Button onClick={increaseQtyHandler}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityAdjuster;
