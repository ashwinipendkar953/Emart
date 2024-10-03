import ProductCard from "../../../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RecentlyViewedProducts = ({ recentlyViewedProducts }) => {
  if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
    return null; // or return a message like "No recently viewed products"
  }
  return (
    <div className="mt-4">
      <h5 className="fw-bold text-capitalize border-bottom-grey mb-4">
        Recently Viewed Products
      </h5>
      <div className="row g-4">
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
            {recentlyViewedProducts &&
              recentlyViewedProducts?.map((product) => (
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

export default RecentlyViewedProducts;
