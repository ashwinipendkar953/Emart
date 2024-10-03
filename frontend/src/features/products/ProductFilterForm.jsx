import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../categories/categorySlice";
import { clearAllFilters } from "./productSlice";
import SortByPriceFilter from "./productFilter/SortByPriceFilter";
import CategoryFilter from "./productFilter/CategoryFilter";
import RatingFilter from "./productFilter/RatingFilter";
import PriceRangeFilter from "./productFilter/PriceRangeFilter";

const ProductFilterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    categories: selectedCategories,
    subCategories: selectedSubCategories,
    sortBy,
    rating,
    priceRange,
  } = useSelector((state) => state.products.filters);

  const params = Object.fromEntries(searchParams.entries());
  // console.log(params)


  const categories = useSelector((state) => state.categories.categories);

  const handleUrlChange = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <form className="py-4 px-3">
      {/* Clear filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label className="form-label fw-bold">Filters</label>
        <button
          type="button"
          className="btn py-0 text-pink fw-semibold"
          onClick={() => {
            dispatch(clearAllFilters());
            navigate("/products");
            window.location.reload();
          }}
        >
          Clear All
        </button>
      </div>
      <hr />

      <PriceRangeFilter
        priceRange={priceRange}
        params={params}
        handleUrlChange={handleUrlChange}
      />
      <hr />

      {categories?.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          selectedSubCategories={selectedSubCategories}
          params={params}
          handleUrlChange={handleUrlChange}
        />
      )}
      <hr />


      <SortByPriceFilter
        sortBy={sortBy}
        params={params}
        handleUrlChange={handleUrlChange}
      />
      <hr />



      <RatingFilter
        rating={rating}
        params={params}
        handleUrlChange={handleUrlChange}
      />
    </form>
  );
};

export default ProductFilterForm;
