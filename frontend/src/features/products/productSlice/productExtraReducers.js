// productExtraReducers.js

import {
  fetchSubCategoryWiseProducts,
  fetchProductDetails,
  fetchFeaturedProducts,
  fetchNewArrivals,
  addProductReview,
  fetchAllProductReviews,
  fetchProducts,
} from "../productSlice";

export const productExtraReducers = (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload.data;
      state.message = action.payload?.message || "All Products";
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload?.message || "Failed to fetch products.";
    })
    .addCase(fetchFeaturedProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.featuredProducts = action.payload.data;
    })
    .addCase(fetchFeaturedProducts.rejected, (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.message =
        action.payload?.message || "Failed to fetch featured products.";
    })
    .addCase(fetchNewArrivals.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNewArrivals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.newArrivalsProducts = action.payload.data;
    })
    .addCase(fetchNewArrivals.rejected, (state, action) => {
      state.isSuccess = false;
      state.isError = true;
    })
    .addCase(fetchSubCategoryWiseProducts.pending, (state, action) => {
      state.isLoading = true;
      state.subCategoryWiseProducts[action.meta.arg.subCategory] = [];
    })
    .addCase(fetchSubCategoryWiseProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.subCategoryWiseProducts[action.meta.arg.subCategory] =
        action.payload.data;
    })
    .addCase(fetchSubCategoryWiseProducts.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload?.message;
    })
    .addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.productDetails = action.payload.data;
    })
    .addCase(fetchProductDetails.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload?.message;
    })
    .addCase(addProductReview.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addProductReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.message;
    })
    .addCase(addProductReview.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload?.message;
    })
    .addCase(fetchAllProductReviews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProductReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.productReviews = action.payload?.data;
    })
    .addCase(fetchAllProductReviews.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload?.message;
    });
};
