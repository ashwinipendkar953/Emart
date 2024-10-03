import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSortByFilter } from "../productSlice";

const SortByPriceFilter = ({ sortBy, params, handleUrlChange }) => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(setSortByFilter(params?.sortBy))
  }, [dispatch, params?.sortBy])

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Sort by</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="price-asc"
          value="price-asc"
          name="sortByPrice"
          checked={sortBy === "price-asc" || params.sortBy === "price-asc"}
          onChange={(e) => {
            handleUrlChange("sortBy", e.target.value);
            dispatch(setSortByFilter(e.target.value))
          }}
        />
        <label htmlFor="price-asc">Price - Low to High</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="price-desc"
          value="price-desc"
          name="sortByPrice"
          checked={sortBy === "price-desc" || params.sortByPrice === "price-desc"}
          onChange={(e) => {
            handleUrlChange("sortBy", e.target.value);
            dispatch(setSortByFilter(e.target.value))
          }}
        />
        <label htmlFor="price-desc">Price - High to Low</label>
      </div>
    </div>
  );
};

export default SortByPriceFilter;
