import React, { useEffect } from "react";
import { makeSelectProductsBySubCategory } from "../productSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoryWiseProducts } from "../productSlice";
import ProductCard from "../../../components/ProductCard";
import ProductCardLoader from "../../../components/ProductCardLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SimilarProducts = ({ subCategory, productId }) => {
  const dispatch = useDispatch();
  const selectProductsBySubCategory = makeSelectProductsBySubCategory();

  const subCategoryWiseProducts = useSelector((state) =>
    selectProductsBySubCategory(state, subCategory)
  );

  const filteredSubCategorywiseProducts = subCategoryWiseProducts?.filter(
    (product) => product._id !== productId
  );

  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchSubCategoryWiseProducts({ subCategory }));
  }, [dispatch, subCategory]);

  return (
    <div className="mt-4">
      <h5 className="fw-bold text-capitalize border-bottom-grey mb-4">
        Similar Products
      </h5>
      <div className="row g-4">
        {isLoading && <ProductCardLoader />}

        <div className="product-card position-relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {filteredSubCategorywiseProducts?.slice(0, 7).map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
