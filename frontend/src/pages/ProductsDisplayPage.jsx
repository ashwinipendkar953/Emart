import { useEffect } from "react";
import ProductFilterForm from "../features/products/ProductFilterForm";
import ProductList from "../features/products/ProductList";
import { IoFilter } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const ProductsDisplayPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params])

  return (
    <div
      className="d-flex flex-column flex-lg-row justify-content-between align-items-start"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <div className="d-lg-flex">
        {/* Offcanvas Sidebar */}
        <div className="offcanvas offcanvas-start d-lg-none" id="demo">
          <div className="offcanvas-header" style={{ marginTop: "4rem" }}>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ProductFilterForm />
          </div>
        </div>

        {/* Sidebar for Large Screens */}
        <div
          className="d-none d-lg-block custom-shadow"
          style={{ width: "350px" }}
        >
          <ProductFilterForm />
        </div>

        {/* Main Content */}
        <div className="container-fluid mt-3 flex-grow-1 position-relative d-flex justify-content-between align-items-center ">
          <main className="flex-grow-1 p-0 w-100 h-100">
            <ProductList />
          </main>
          <button
            className="btn btn-pink d-lg-none position-absolute"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#demo"
            style={{ top: "3px", right: "30px", zIndex: 1000 }}
          >
            <IoFilter size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplayPage;
