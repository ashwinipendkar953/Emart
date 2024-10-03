import "./header.css";
import { GrSearch } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchQueryFilter } from "../../features/products/productSlice";
import { useEffect } from "react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if(params?.searchQuery){
      dispatch(setSearchQueryFilter(params?.searchQuery))
    }
  }, [dispatch, params?.searchQuery])

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value) {
      dispatch(setSearchQueryFilter(value))
      searchParams.set('searchQuery', value)
    } else {
      searchParams.delete('searchQuery')
      dispatch(clearAllFilters())
    }

    navigate({
      pathname:'/admin-panel/all-products',
      search: searchParams.toString(),
    })
  };

  return (
    <nav className="navbar navbar-expand-lg adminNav">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Brand */}
        <Link className="navbar-brand col-3 col-md-1" to="/admin-panel/all-products">
          <span className="text-pink fw-bold fs-4">Emart</span>
        </Link>

        {/* Collapsible content for the search box */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto col-12 col-md-6 d-lg-flex justify-content-end align-items-center position-relative">
            <form className="d-flex w-100" role="search">
              <div className="position-absolute ms-2 fs-4">
                <GrSearch />
              </div>
              <input
                className="form-control border ps-5"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={handleSearch}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
