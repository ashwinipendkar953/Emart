import { createSlice } from "@reduxjs/toolkit";

import { productReducers } from "./productSlice/productReducers";
import { productExtraReducers } from "./productSlice/productExtraReducers";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_DOMAIN from "../../config";
import { getAuthHeaders } from "../../utils/getAuthHeaders";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    
    try {
      const response = await axios.get(`${API_DOMAIN}/products`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubCategoryWiseProducts = createAsyncThunk(
  "products/subCategory-products",
  async ({ subCategory }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/products/subCategory`, {
        subCategory,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/product-details",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_DOMAIN}/products/details`, {
        productId,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/featured",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/products/featured`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "products/new-arrivals",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_DOMAIN}/products/new-arrivals`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProductReview = createAsyncThunk(
  "products/addReview",
  async (reviewData, thunkAPI) => {
    console.log(reviewData);
    try {
      const response = await axios.post(
        `${API_DOMAIN}/products/reviews`,
        reviewData,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.message === "Please Login...!") {
        return thunkAPI.rejectWithValue({ message: error.message });
      }

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllProductReviews = createAsyncThunk(
  "products/reviews",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_DOMAIN}/products/reviews/${productId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    newArrivalsProducts: [],
    recentlyViewedProducts:
      JSON.parse(localStorage.getItem("recentlyViewed")) || [],
    subCategoryWiseProducts: {},
    productDetails: {},
    productReviews: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    filters: {
      categories: [],
      subCategories: [],
      priceRange: [100, 10000],
      rating: 0,
      searchQuery: "",
      sortBy: "",
    },
  },
  reducers: productReducers,
  extraReducers: productExtraReducers,
});

export const {
  productResetState,
  clearSubCategoryWiseProducts,
  addRecentlyViewed,
  clearAllFilters,
  setCategoriesFilter,
  setSubCategoriesFilter,
  setPriceRangeFilter,
  setRatingFilter,
  setSearchQueryFilter,
  setSortByFilter
} = productSlice.actions;

export const productReducer = productSlice.reducer;
