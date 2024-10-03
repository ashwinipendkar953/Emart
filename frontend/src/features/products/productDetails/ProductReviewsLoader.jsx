const ProductReviewsLoader = () => {
  return (
    <div className="row g-3">
      {new Array(2).fill(null).map((_, index) => (
        <div className="col-lg-6" key={index}>
          <div className="review-item card pb-0 h-100">
            <div className="p-3">
              <div className="d-flex d-grid pb-2 gap-2 align-items-center">
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "1rem",
                    width: "50%",
                  }}
                ></div>
              </div>
              <div className="d-md-flex justify-content-between align-items-center">
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "1rem",
                    width: "30%",
                  }}
                ></div>
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "1rem",
                    width: "20%",
                  }}
                ></div>
              </div>
              <p
                className="fw-semibold mb-0 pb-0"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              >
                Reviewed on{" "}
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{ width: "60px", display: "inline-block" }}
                ></div>
              </p>
              <div
                className="bg-lightgrey pulse-animation mb-2"
                style={{
                  height: "1rem",
                  width: "80%",
                }}
              ></div>
              <div
                className="bg-lightgrey pulse-animation mb-2"
                style={{
                  height: "1rem",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewsLoader;
