import { FaArrowRightLong } from "react-icons/fa6";
import banner5 from "../../assets/home/banner-05.webp";
import banner6 from "../../assets/home/banner-06.webp";
import { Link } from "react-router-dom";

const BigBannerCardsTwo = () => {
  return (
    <div className="big-banner-card container-fluid mx-auto px-4 mt-5 my-2">
      <div className="row g-4">
        <div className="col-lg-6">
          <Link
            className="text-dark text-decoration-none"
            to="/products?subCategories=jewellery"
          >
            <div className="banner-wrapper">
              <img src={banner5} alt="Banner 2" />
              <div className="banner-text">
                <h6>New Season</h6>
                <h5 className="display-6 fw-semibold">
                  Shop the best
                  <br /> jewellery of your life
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
          <Link className="text-dark text-decoration-none" to="/products">
            <div className="banner-wrapper">
              <img src={banner6} alt="Banner 3" />
              <div className="banner-text">
                <h6>New Season</h6>
                <h5 className="display-6 fw-semibold">
                  Big patterns are
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
      </div>
    </div>
  );
};

export default BigBannerCardsTwo;
