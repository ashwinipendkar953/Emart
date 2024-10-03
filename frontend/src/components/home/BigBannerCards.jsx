import { FaArrowRightLong } from "react-icons/fa6";
import banner1 from "../../assets/home/banner-01.jpg";
import banner2 from "../../assets/home/banner-02.webp";
import banner3 from "../../assets/home/banner-03.webp";
import { Link } from "react-router-dom";

const BigBannerCards = () => {
  return (
    <div className="big-banner-card container-fluid mx-auto px-4 my-2" id="sale-products">
      <div className="row g-4">
        <div className="col-lg-6 d-none d-lg-block">
          <Link
            className="text-dark text-decoration-none"
            to="/products?categories=women"
          >
            <div className="banner-wrapper">
              <img src={banner1} alt="Banner 1" className="img-fluid" />
              <div className="banner-text">
                <h6>New Season</h6>
                <h5 className="display-6 fw-semibold">
                  Big Patterns are
                  <br /> back in fashion
                </h5>
                <p className="small text-secondary">
                  Don't miss the opportunity.
                </p>
                <p className="fw-bold">
                  Shop Now{" "}
                  <span>
                    <FaArrowRightLong />
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="row g-4">
            <div className="col-12">
              <Link
                className="text-dark text-decoration-none"
                to="/products?categories=men"
              >
                <div className="banner-wrapper">
                  <img src={banner2} alt="Banner 2" />
                  <div className="banner-text">
                    <h6>New Season</h6>
                    <h5 className="display-6 fw-semibold">
                      The latest men's
                      <br /> trends this season
                    </h5>
                    <p className="small text-secondary">
                      Don't miss the opportunity.
                    </p>
                    <p className="fw-bold">
                      Shop Now{" "}
                      <span>
                        <FaArrowRightLong />
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12">
              <Link
                className="text-dark text-decoration-none"
                to="/products?subCategories=footwear"
              >
                <div className="banner-wrapper">
                  <img src={banner3} alt="Banner 3" />
                  <div className="banner-text">
                    <h6>New Season</h6>
                    <h5 className="display-6 fw-semibold">
                      Show your fashion
                      <br /> with summer shoes
                    </h5>
                    <p className="small text-secondary">
                      Don't miss the opportunity.
                    </p>
                    <p className="fw-bold">
                      Shop Now{" "}
                      <span>
                        <FaArrowRightLong />
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBannerCards;
