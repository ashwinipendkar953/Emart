import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubCategoriesWithProduct } from "../../features/categories/categorySlice";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SubCategoryListWithProducts = () => {
  const dispatch = useDispatch();
  const { subCategoriesWithProducts, isLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllSubCategoriesWithProduct());
  }, [dispatch]);

  return (
    <div className="container-fluid product-card bg-light my-4 mx-auto pt-5 pb-4 px-4 slider-products">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        loop={true}
        slidesPerView={13}
        navigation={{
          prevEl: ".left-arrow-icon",
          nextEl: ".right-arrow-icon",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 7,
          },
          768: {
            slidesPerView: 9,
          },
          1024: {
            slidesPerView: 13,
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div
                  className="d-flex flex-column align-items-center mx-2 mb-4"
                  style={{ width: "5rem", height: "5rem" }}
                >
                  <div
                    className="rounded-circle bg-secondary-subtle border"
                    style={{
                      width: "5rem",
                      height: "5rem",
                      padding: "0.75rem",
                    }}
                  >
                    <div
                      className="bg-lightgrey pulse-animation"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    className="mt-2 bg-lightgrey pulse-animation w-75"
                    style={{ height: "1rem", opacity: 0.5 }}
                  ></div>
                </div>
              </SwiperSlide>
            ))
          : subCategoriesWithProducts?.map((product) => (
              <SwiperSlide key={product?._id}>
                <Link
                  className="cursor-pointer text-decoration-none d-flex flex-column justify-content-center align-items-center text-dark"
                  to={`/products?subCategories=${product.subCategory}`}
                >
                  <div
                    className="image-container rounded-circle overflow-hidden mx-2 bg-white border"
                    style={{
                      width: "5rem",
                      height: "5rem",
                      padding: "0.75rem",
                    }}
                  >
                    <img
                      src={product?.images[0]}
                      alt={product?.subCategory}
                      className="w-100"
                      style={{
                        objectFit: "contain",
                        maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <p
                    className="text-center text-capitalize mt-1 d-flex justify-content-center align-items-center small"
                    style={{ fontSize: "15px", fontWeight: 400 }}
                  >
                    {product?.subCategory}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="btn btn-light ms-2 z-3 shadow rounded-circle position-absolute start-0 top-50 translate-middle-y left-arrow-icon">
        <FaAngleLeft />
      </button>
      <button className="btn btn-light me-2 z-3 shadow rounded-circle position-absolute end-0 top-50 translate-middle-y right-arrow-icon">
        <FaAngleRight />
      </button>
    </div>
  );
};

export default SubCategoryListWithProducts;
