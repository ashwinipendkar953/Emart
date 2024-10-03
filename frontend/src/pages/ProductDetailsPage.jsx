import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecentlyViewed,
  fetchProductDetails,
} from "../features/products/productSlice";
import "../css/productModal.css";

import Breadcrumb from "../features/products/productDetails/Breadcrumb";
import ProductDetailsImage from "../features/products/productDetails/ProductDetailsImage";
import ProductInfo from "../features/products/productDetails/ProductInfo";
import { useParams } from "react-router-dom";
import ProductDescription from "../features/products/productDetails/ProductDescription";
import SimilarProducts from "../features/products/productDetails/SimilarProducts";
import RecentlyViewedProducts from "../features/products/productDetails/RecentlyViewedProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const {
    productDetails: product,
    isLoading,
    recentlyViewedProducts,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && Object.keys(product).length > 0) {
      dispatch(addRecentlyViewed(product));
    }
  }, [dispatch, product]);

  return (
    <main className="container-fluid px-4 py-4 bg-white ">
      <Breadcrumb product={product} />
      <div className="row g-5 productDetailsModal">
        <div className="col-lg-4 productDetailsCol">
          <ProductDetailsImage product={product} isLoading={isLoading} />
        </div>
        <div className="d-lg-block d-none" style={{ width: "1rem" }}></div>
        {/* product info part */}
        <div className="col-lg-7">
          <ProductInfo product={product} isLoading={isLoading} />
        </div>
      </div>

      {/* product description */}
      {product?.description && (
        <ProductDescription product={product} isLoading={isLoading} />
      )}

      {/* similar products */}
      {product?.subCategory && (
        <SimilarProducts
          subCategory={product?.subCategory}
          productId={productId}
        />
      )}

      {/* recently viewed products */}
      {recentlyViewedProducts.length > 0 && (
        <RecentlyViewedProducts
          recentlyViewedProducts={recentlyViewedProducts}
        />
      )}
    </main>
  );
};

export default ProductDetails;
