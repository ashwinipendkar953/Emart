import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  calculateMaxPrice,
  calculateMinPrice,
  displayINRCurrency,
} from "../../../utils/helpers";
import { setPriceRangeFilter } from "../productSlice";

const PriceRangeFilter = ({ priceRange, params, handleUrlChange }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(
    (state) => state.products
  );

  const maxPrice = calculateMaxPrice(products);
  const minPrice = calculateMinPrice(products);

  useEffect(() => {
    if (!params?.minPrice || !params?.maxPrice) {
      dispatch(setPriceRangeFilter([minPrice, maxPrice]))
    } else {
      dispatch(setPriceRangeFilter([params?.minPrice, params?.maxPrice]))
    }
  }, [dispatch, minPrice, maxPrice, products])

  const handlePriceChange = (event, newValue) => {
    dispatch(setPriceRangeFilter(newValue))
    handleUrlChange("minPrice", newValue[0])
    handleUrlChange("maxPrice", newValue[1])
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Price</label>
      <Box sx={{ width: 280 }} className="priceRangeBoxSlider">
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}

        />
      </Box>
      <div className="d-flex justify-content-between align-items-center p-2">
        <span>
          From:{" "}
          <strong className="text-success">{displayINRCurrency(priceRange[0])}</strong>
        </span>
        <span className="ml-auto">
          From:{" "}
          <strong className="text-success">{displayINRCurrency(priceRange[1])}</strong>
        </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
