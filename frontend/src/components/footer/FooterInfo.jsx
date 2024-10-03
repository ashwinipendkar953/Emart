import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../features/categories/categorySlice";
import { Link } from "react-router-dom";

const FooterInfo = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="footer-info">
      <div className="container-fluid px-4 py-4">
        <div className="row g-4">
          <div className="col-lg-5">
            <h5 className="display-6 fw-bold text-pink">Emart</h5>
            <p className="small">
              Discover the best products and exclusive offers at Emart. Elevate
              your shopping experience with our wide selection of items across
              various categories.
            </p>
            <p className="small">(+800) 1234 5678 90 – info@example.com</p>
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className=" col-md-4">
                <h6 className="fw-bold">Information</h6>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="text-dark text-decoration-none">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark text-decoration-none">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark text-decoration-none">
                      Returns Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark text-decoration-none">
                      Shipping Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div className=" col-md-4">
                <h6 className="fw-bold">Shop</h6>
                <ul className="list-unstyled">
                  <li>
                    <Link to="#featured-products" className="text-dark text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById("featured-products");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}>
                      Featured Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-dark text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                      Discount
                    </Link>
                  </li>
                  <li>
                    <Link to="#latest-products" className="text-dark text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById("latest-products");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}>
                      Latest Products
                    </Link>
                  </li>
                  <li>
                    <Link to="#sale-products" className="text-dark text-decoration-none" onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById("sale-products");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}>
                      Sale Products
                    </Link>
                  </li>
                </ul>
              </div>

              <div className=" col-md-4">
                <h6 className="fw-bold">Shop</h6>
                <ul className="list-unstyled">
                  {categories?.map((category) => {
                    return (
                      <li key={category?._id}>
                        <Link
                          to={`/products?categories=${category?.value}`}
                          className="text-dark text-decoration-none"
                        >
                          {category?.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterInfo;
