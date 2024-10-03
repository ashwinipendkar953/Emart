import { FaShippingFast, FaHeadset, FaCreditCard } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

import { displayINRCurrency } from "../../utils/helpers";

const FooterInfoIcons = () => {
  return (
    <div className="container-fluid px-4">
      <div className="py-3 footer-icons-div">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="d-flex d-grid gap-4">
              <div className="footer-icon text-pink">
                <FaShippingFast size={45} />
              </div>
              <div className="footer-icons-info">
                <h4>Free Shipping</h4>
                <p className="small text-secondary">
                  Free Shipping for orders above{" "}
                  <span>{displayINRCurrency(450)}</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex d-grid gap-4">
              <div className="footer-icon text-pink">
                <RiMoneyRupeeCircleFill size={45} />
              </div>
              <div className="footer-icons-info">
                <h4>Money Guarantee</h4>
                <p className="small text-secondary">
                  Within 30 days for an exchange.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex d-grid gap-4">
              <div className="footer-icon text-pink">
                <FaHeadset size={45} />
              </div>
              <div className="footer-icons-info">
                <h4>Online Support</h4>
                <p className="small text-secondary">
                  Within 30 days for an exchange.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex d-grid gap-4">
              <div className="footer-icon text-pink">
                <FaCreditCard size={45} />
              </div>
              <div className="footer-icons-info">
                <h4>Flexible Payment</h4>
                <p className="small text-secondary">
                  Pay with Multiple Credit Cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterInfoIcons;
