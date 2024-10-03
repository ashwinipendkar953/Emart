import { useEffect, useState } from "react";
import ProductReviews from "./ProductReviews"; // Import the new component
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductReviews } from "../productSlice";

const ProductDescription = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("description");
  const brandName = product?.brandName;
  const details = product?.description.split(". ");
  const detailsLoading = new Array(4).fill(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-5 product-description card" id="reviews-section">
      <ul className="nav nav-tabs border-none mb-3 p-2">
        <li className="nav-item">
          <a
            className={`nav-link text-grey fw-semibold ${
              activeTab === "description" ? "active text-dark" : ""
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link text-grey fw-semibold ${
              activeTab === "additional" ? "active text-dark" : ""
            }`}
            onClick={() => handleTabClick("additional")}
          >
            Additional Information
          </a>
        </li>
        <li className="nav-item ">
          <a
            className={`nav-link text-grey fw-semibold ${
              activeTab === "reviews" ? "active text-dark" : ""
            }`}
            onClick={() => handleTabClick("reviews")}
          >
            Reviews ({`${product?.numReviews > 0 ? product?.numReviews : 0}`})
          </a>
        </li>
      </ul>

      <div>
        {activeTab === "description" && (
          <>
            {isLoading ? (
              <div className="px-4">
                {detailsLoading?.map((_, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 pulse-animation mb-3"
                    style={{ height: "1.5rem", width: `${80 - index * 10}%` }}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="px-4">
                <p className="my-3 mt-0 pt-0">
                  {details?.slice(0, 3).join(".") + "."}
                </p>
                {details?.length > 2 && (
                  <p className="my-3">{details?.slice(3).join(".")}</p>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "additional" && (
          <div className="px-4">
            <p className="d-flex " style={{ fontSize: "1.2rem" }}>
              <span className="fw-bold">Brand:</span>
              <span className="ms-2">{brandName}</span>
            </p>
          </div>
        )}

        {activeTab === "reviews" && <ProductReviews product={product} />}
      </div>
    </div>
  );
};

export default ProductDescription;
