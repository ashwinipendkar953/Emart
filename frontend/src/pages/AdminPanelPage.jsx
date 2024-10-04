import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { logoutAsync } from "../features/auth/authSlice";
import { clearUserDetails } from "../features/user/userSlice";

const AdminPanelPage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    navigate("/admin-panel/all-products");
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Wait for logout to complete
      await dispatch(logoutAsync());

      // Now fetch user details with null to clear the data
      dispatch(clearUserDetails());

      // Navigate to the homepage
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div
      className="d-flex flex-column flex-lg-row justify-content-between align-items-start"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Offcanvas Sidebar for Small Screens */}
      <div className="offcanvas offcanvas-start d-lg-none" id="offcanvasAdminSidebar">
        <div className="offcanvas-header" style={{ marginTop: "4rem" }}>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
            <div style={{ height: "100px" }}>
              <Link
                role="button"
                className="text-black w-100 center-content text-decoration-none"
              >
                {user?.profilePic ? (
                  <img
                    className="img-fluid rounded-circle"
                    src={user?.profilePic}
                    alt={user?.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                ) : (
                  <FaRegCircleUser size={50} />
                )}
              </Link>
            </div>
            <p className="text-capitalize mb-0 fw-bold">{user?.name}</p>
            <p className="mb-0">{user?.role}</p>
          </div>

          {/* Admin Navigation */}
          <nav>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                  to={"all-users"}
                >
                  All Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                  to={"all-products"}
                >
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                  to={"all-categories"}
                >
                  All Categories
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto p-3 position-absolute bottom-0">
            <Link
              className="btn btn-pink fw-semibold w-100"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar for Large Screens */}
      <div className="d-none d-lg-block custom-shadow adminSidebar" style={{ width: "280px", height: "calc(100vh - (-65px))" }}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "200px" }}>
          <div>
            <Link
              role="button"
              className="text-black w-100 center-content text-decoration-none"
            >
              {user?.profilePic ? (
                <img
                  className="img-fluid rounded-circle"
                  src={user?.profilePic}
                  alt={user?.name}
                  style={{ width: "80px", height: "80px" }}
                />
              ) : (
                <FaRegCircleUser size={50} />
              )}
            </Link>
          </div>
          <p className="text-capitalize mb-0 fw-bold">{user?.name}</p>
          <p className="mb-0">{user?.role}</p>
        </div>

        {/* Admin Navigation */}
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-users"}
              >
                All Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-products"}
              >
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-categories"}
              >
                All Categories
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-3 position-absolute bottom-0">
          <Link
            className="btn btn-pink fw-semibold w-100"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid mt-3 flex-grow-1 position-relative adminPanelDiv d-flex justify-content-between align-items-center">
        <main className="flex-grow-1 p-4 w-100 h-100 adminPanelMain">
          <Outlet />
        </main>
        <button
          className="btn btn-pink d-lg-none position-absolute"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasAdminSidebar"
          style={{ top: "3px", right: "10px", zIndex: 1000 }}
        >
          <FaBars size={20} />
        </button>
      </div>
    </div>
  );
};

export default AdminPanelPage;
