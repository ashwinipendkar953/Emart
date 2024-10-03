import { useRef, useState } from "react";
import { calculateDiscount } from "../../utils/helpers";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductModalImage = ({ product }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSlider.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
  return (
    <>
      <div className="productZoom product-card position-relative">
        <div className="product-badges position-absolute">
          <p className="text-center">
            {`${calculateDiscount(product?.price, product?.sellingPrice)}%`}
          </p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          slidesPerGroup={1}
          modules={[Navigation]}
          className="zoomSliderBig"
          ref={zoomSliderBig}
        >
          {product?.images?.map((image, index) => {
            return (
              <SwiperSlide key={image?._id || index}>
                <div
                  className="item d-flex justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={image}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        navigation={true}
        slidesPerGroup={1}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        className="zoomSlider"
        ref={zoomSlider}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {product?.images?.map((image, index) => {
          return (
            <SwiperSlide key={image._id || index}>
              <div
                className={`item ${
                  slideIndex === index && "item_active"
                } image-container`}
                onClick={() => goto(index)}
              >
                <img
                  src={image}
                  className="w-100 product-image"
                  style={{
                    objectFit: `${
                      product?.category === "electronics" ? "contain" : "cover"
                    }`,
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductModalImage;
