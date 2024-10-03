import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../products/productSlice";
import Pagination from "react-js-pagination";

import AdminProductDisplayCard from "./AdminProductDisplayCard";
import UploadProductForm from "./UploadProductForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { filterProducts } from "../../utils/filterProducts";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [productToEdit, setProductToEdit] = useState(null);

  const {  products, isLoading, filters } = useSelector(
    (state) => state.products
  );
  const filteredProducts = filterProducts(products, filters)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProducts());
  }, [dispatch]);

  const productsPerPage = 12;
  const [activePage, setCurrentPage] = useState(1);

  // logic for displaying current products
  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
  };

  const handleClose = () => {
    setProductToEdit(null);
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 d-flex justify-content-between align-items-center allProductsDiv">
        <div className="d-flex align-items-center">
          <span className="fw-semibold fs-5 mb-0">
            Showing {currentProducts.length} of {filteredProducts?.length}{" "}
            {products?.length === 1 ? "product" : "products"}
          </span>
        </div>
        <button
          className="btn btn-outline-danger fs-5 px-3 rounded-pill"
          data-bs-toggle="modal"
          data-bs-target="#allProducts"
          onClick={() => handleEditClick(null)}
        >
          Upload Product
        </button>
      </div>

      {/* upload product component */}
      {productToEdit !== null ? (
        <UploadProductForm
          productToEdit={productToEdit}
          onClose={handleClose}
        />
      ) : (
        <UploadProductForm />
      )}

      {isLoading && <LoadingSpinner />}

      {/* all products */}
      <div
        className="row my-4 g-4 overflow-y-scroll result"
        style={{ height: "calc(100vh - 190px)" }}
      >
        {currentProducts?.map((product) => (
          <AdminProductDisplayCard
            product={product}
            key={product._id}
            onEdit={() => handleEditClick(product)}
          />
        ))}
      </div>

      <div className="pagination">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={productsPerPage}
          totalItemsCount={filteredProducts?.length}
          pageRangeDisplayed={4}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllProducts;
