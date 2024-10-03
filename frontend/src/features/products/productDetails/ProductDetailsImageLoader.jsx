const ProductDetailsImageLoader = () => {
  return (
    <>
      {/* Loader for the main zoom image area */}
      <div
        className="productZoom product-card position-relative"
        style={{ height: "500px" }}
      >
        <div className="loader-skeleton bg-slate-200 pulse-animation w-100 h-100"></div>
      </div>

      {/* Loader for the thumbnail images */}
      <div className="mt-4">
        <div className="d-flex">
          {new Array(4).fill(null).map((_, index) => (
            <div
              key={index}
              className="loader-skeleton bg-slate-200 pulse-animation mx-2"
              style={{
                height: "100px",
                width: "80px",
                borderRadius: "5px",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsImageLoader;
