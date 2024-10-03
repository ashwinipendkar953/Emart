import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountWishlistProducts,
  getWishlistProducts,
} from "../features/wishlist/wishlistSlice";
import WishlistProductCard from "../features/wishlist/WishlistProductCard";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistProducts, wishlistProductCount } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getWishlistProducts());
    dispatch(getCountWishlistProducts());
  }, [dispatch]);

  return (
    <main className="container-fluid px-4 py-4">
      {wishlistProducts?.length === 0 ? (
        <div className=" text-center my-5">
          <div className="bg-white p-4 rounded shadow">
            <div className="bg-white">
              <h6 className="display-6 fw-semibold">Your Wishlist is Empty</h6>
              <p>
                It seems you haven't added any products to your wishlist yet.
                Explore our catalog and save your favorite items for later!
              </p>
              <p className="mb-0">
                <Link to="/products" className="btn btn-pink">
                  Browse Products
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-100 bg-white text-center py-1">
            <h1>
              My Wishlist{" "}
              <span className="text-pink">({wishlistProductCount})</span>
            </h1>
          </div>
          <div className="row g-3 my-2">
            {wishlistProducts?.map((item) => {
              const product = item.productId;
              return (
                <div
                  className="col-lg-3 col-md-4 product-card"
                  key={item?._id}
                  // style={{ minHeight: "calc(100vh - 284px)" }}
                >
                  <WishlistProductCard product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default WishlistPage;
