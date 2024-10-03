import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayINRCurrency } from "../../utils/helpers";
import {
  clearSubCategoryWiseProducts,
  fetchSubCategoryWiseProducts,
} from "../../features/products/productSlice";
import { makeSelectProductsBySubCategory } from "../../features/products/productSelector";
import HorizontalCardProductsLoader from "./HorizontalCardProductsLoader";
import {
  addItemToCart,
  getCountCartItems,
} from "../../features/cart/cartSlice";

// Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HorizontalCardProducts = ({ subCategory, heading }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const selectProductsBySubCategory = makeSelectProductsBySubCategory();
  const subCategoryWiseProducts = useSelector((state) =>
    selectProductsBySubCategory(state, subCategory)
  );
  const isLoading = useSelector((state) => state.products.isLoading);

  // Fetch products by subcategory
  useEffect(() => {
    dispatch(fetchSubCategoryWiseProducts({ subCategory }));
  }, [dispatch, subCategory]);

  // Cleanup subcategory products on unmount
  useEffect(() => {
    return () => {
      dispatch(clearSubCategoryWiseProducts());
    };
  }, [dispatch, subCategory]);

  const handleAddToCart = (e, productId) => {
    const quantity = 1;
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart({ productId, quantity })).then(() => {
      dispatch(getCountCartItems());
    });
  };

  return (
    <div className="container-fluid product-card bg-light mx-auto px-4 pb-4 my-4 position-relative slider-products">
      <h2 className="fs-4 fw-semibold py-2">{heading}</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {isLoading ? (
          <HorizontalCardProductsLoader />
        ) : (
          subCategoryWiseProducts?.slice(0, 7).map((product) => {
            // Check if the product is in the cart
            const isInCart = cartItems?.some(
              (item) => item.productId?._id === product._id
            );

            return (
              <SwiperSlide key={product._id}>
                <div className="card h-100">
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/products/details/${product._id}`}
                  >
                    <div className="row g-0 mb-0 pb-0">
                      <div className="col-md-5 bg-secondary-subtle d-flex justify-content-center align-items-center">
                        <img
                          src={product?.images[0]}
                          className="img-fluid rounded-start product-image"
                          alt={product?.name}
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <h5
                            className="card-title text-truncate"
                            style={{ minWidth: "10rem" }}
                          >
                            {product?.name}
                          </h5>
                          <p className="card-text mb-0 text-capitalize">
                            {product?.subCategory}
                          </p>
                          <div className="d-flex">
                            <p className="me-2 fw-semibold">
                              {displayINRCurrency(product?.sellingPrice)}
                            </p>
                            <p className="text-muted text-decoration-line-through">
                              {displayINRCurrency(product?.price)}
                            </p>
                          </div>
                          {isInCart ? (
                            <button
                              className="btn btn-pink rounded-pill w-100 btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                navigate("/cart");
                              }}
                            >
                              View Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-pink rounded-pill w-100 btn-sm"
                              onClick={(e) => handleAddToCart(e, product._id)}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
};

export default HorizontalCardProducts;
