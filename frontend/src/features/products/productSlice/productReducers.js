// productReducers.js

export const productReducers = {
  productResetState: (state) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = false;
    state.message = "";
  },
  clearSubCategoryWiseProducts: (state) => {
    state.subCategoryWiseProducts = {};
  },
  addRecentlyViewed: (state, action) => {
    const product = action.payload;
    // prevent duplicates
    const exists = state.recentlyViewedProducts.find(
      (p) => p._id === product._id
    );
    if (!exists) {
      state.recentlyViewedProducts = [
        product,
        ...state.recentlyViewedProducts,
      ].slice(0, 10);
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(state.recentlyViewedProducts)
      );
    }
  },
  clearAllFilters(state) {
    state.filters.categories = [];
    state.filters.subCategories = [];
    state.filters.rating = null;
    state.filters.sortByPrice = "asc";
    state.filters.searchQuery = "";
  },
  setCategoriesFilter: (state, action) => {
    state.filters.categories = action.payload;
  },
  setSubCategoriesFilter: (state, action) => {
    state.filters.subCategories = action.payload;
  },
  setPriceRangeFilter: (state, action) => {
    state.filters.priceRange = action.payload;
  },
  setRatingFilter: (state, action) => {
    state.filters.rating = action.payload;
  },
  setSearchQueryFilter: (state, action) => {
    state.filters.searchQuery = action.payload
  },
  setSortByFilter: (state, action) => {
    state.filters.sortBy = action.payload
  }
};
