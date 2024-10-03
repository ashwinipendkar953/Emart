import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import img1 from "../../assets/banner/img1.jpg";
import img2 from "../../assets/banner/img2.jpg";
import img3 from "../../assets/banner/img3.webp";
import img4 from "../../assets/banner/img4.png";
import img5 from "../../assets/banner/img5.jpg";
import img6 from "../../assets/banner/img6.jpg";
import img7 from "../../assets/banner/img7.webp";

const carouselImages = [img1, img2, img3, img4, img5, img6, img7];

const BannerProductCarousel = () => {
  return (
    <div className="slider-products product-card text-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="banner-swiper"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{ height: "350px", width: "100%" }}
            className="bannerCarousel w-100"
          >
            <img
              src={image}
              className="d-block w-100 h-100 img-fluid"
              alt={`Carousel Image ${index}`}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerProductCarousel;
