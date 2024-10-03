const ProductCardLoader = () => {
  return (
    <div className="row g-4 mb-4">
      {new Array(3).fill(null).map((_, index) => (
        <div className="col-lg-4 col-md-6" key={index}>
          <div className="card h-100 rounded-0" style={{ minWidth: "16rem" }}>
            <div className="card-img-top">
              <div
                className="bg-lightgrey pulse-animation"
                style={{
                  height: "200px",
                  width: "100%",
                }}
              ></div>
            </div>
            <div className="card-body">
              <div className="product-details">
                <div className="d-flex justify-content-between align-items-center mb-2">
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
                <div
                  className="bg-lightgrey pulse-animation mb-2"
                  style={{
                    height: "1.25rem",
                    width: "80%",
                  }}
                ></div>
                <div
                  className="bg-lightgrey pulse-animation mb-2"
                  style={{
                    height: "1rem",
                    width: "60%",
                  }}
                ></div>

                <div className="d-flex d-grid gap-2 mb-2">
                  <div
                    className="bg-lightgrey pulse-animation"
                    style={{
                      height: "1.5rem",
                      width: "50%",
                    }}
                  ></div>
                  <div
                    className="bg-lightgrey pulse-animation"
                    style={{
                      height: "1.5rem",
                      width: "50%",
                    }}
                  ></div>
                </div>

                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "2rem",
                    width: "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardLoader;
