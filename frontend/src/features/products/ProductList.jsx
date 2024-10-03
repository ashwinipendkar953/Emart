import ProductCard from "../../components/ProductCard";
import ProductCardLoader from "../../components/ProductCardLoader";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSortByFilter } from "./productSlice";
import { filterProducts } from "../../utils/filterProducts";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, isLoading, filters } = useSelector((state) => state.products);
  // console.log(filters)

  const productsPerPage = 9; // Limit per page
  const [activePage, setCurrentPage] = useState(1); // Current page

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = filterProducts(products, filters)

  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value) {
      dispatch(setSortByFilter(value))
    }
  }

  return (
    <div className="px-4 py-2 h-100 w-100">
      <div className="d-lg-flex justify-content-between align-items-center w-100">
        <p>
          <span className="fw-bold fs-5">
            Showing {currentProducts?.length} of {filteredProducts?.length}{" "}
            {filteredProducts?.length === 1 ? "product" : "products"}
          </span>
        </p>
        <div className="ms-auto">
          <div className="input-group mb-3">
            <label htmlFor="sortBy" className="input-group-text bg-white">Sort By</label>
            <select name="sortBy" id="sortBy" className="form-select" value={filters?.sortBy} onChange={handleSortChange}>
              <option>Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <ProductCardLoader />
      )}


      <div className="row my-4 g-4 overflow-y-scroll result"
        style={{ height: "calc(100vh - 1px)" }}>
        {currentProducts &&
          currentProducts.map((product) => (
            <div
              className="product-card position-relative col-lg-4 col-md-4 col-sm-6 col-12"
              key={product?._id}
            >
              <ProductCard product={product} />
            </div>
          ))}

        {filteredProducts?.length > 0 && <div className="pagination ms-auto">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={productsPerPage}
            totalItemsCount={filteredProducts?.length}
            pageRangeDisplayed={4}
            onChange={handlePageChange}
          />
        </div>}
      </div>



    </div>
  );
};

export default ProductList;
