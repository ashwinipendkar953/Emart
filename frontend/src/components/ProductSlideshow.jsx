import { useEffect, useState } from "react";

const ProductSlideshow = ({ images, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Automatically slide through images when hovered
  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        nextImage();
      }, 1500);
    } else if (!isHovered && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  return (
    <div
      className="product-slideshow position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="image-container  mx-auto"
        style={{
          width: "100%",
          height: "20rem",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="product-image"
          style={{
            objectFit: `${category === "electronics" ? "contain" : "cover"}`,
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* Dots for navigating between images */}
      <div className="dots">
        {images?.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductSlideshow;
