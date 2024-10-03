import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../ProductCard";
import { fetchFeaturedProducts } from "../../features/products/productSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCardLoader from "../ProductCardLoader";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, []);

  return (
    <div className="container-fluid px-4 best-seller-products" id="featured-products">
      <div className="module-header py-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="entry-title">Featured Products</h3>
          <p>
            Explore our handpicked featured products, loved by our customers for
            their quality and style! From trendy apparel to cutting-edge
            gadgets, these top-rated items are chosen to match your lifestyle.
            Don't miss out on the bestsellers that everyone's raving about!
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
          {featuredProducts?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedProducts;
