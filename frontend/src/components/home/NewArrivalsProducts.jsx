import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../ProductCard";
import { fetchNewArrivals } from "../../features/products/productSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCardLoader from "../ProductCardLoader";

const NewArrivalsProducts = () => {
  const dispatch = useDispatch();
  const { newArrivalsProducts, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  return (
    <div className="container-fluid px-4 best-seller-products" id="latest-products">
      <div className="module-header py-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="entry-title">New Arrivals</h3>
          <p>
            Discover the latest additions to our collection! From fresh fashion
            trends to the newest tech gadgets, explore what's new and stay ahead
            of the curve. Our newest products are carefully selected to bring
            you the best in quality and style.
          </p>
        </div>
      </div>

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
          {newArrivalsProducts?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivalsProducts;
