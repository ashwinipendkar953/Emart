import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { logoutAsync } from "../features/auth/authSlice";
import { clearUserDetails } from "../features/user/userSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync());
      dispatch(clearUserDetails());
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
      <div className="offcanvas offcanvas-start d-lg-none" id="demo">
        <div className="offcanvas-header" style={{ marginTop: "4rem" }}>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column justify-content-center ">
            <div className="mb-5">
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
            <p className="text-capitalize mb-0 fw-bold mt-1">{user?.name}</p>
            <nav className="">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={"/my/dashboard"}>
                    Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/my/profile/edit"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"orders"}>
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/my/address"}>
                    Addresses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/my/user/delete"}>
                    Delete Account
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
      </div>

      {/* Sidebar for Large Screens */}
      <div className="d-none d-lg-block custom-shadow" style={{ width: "280px", height: "calc(100vh - (-65px))" }}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "180px" }}>
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
          <p className="text-capitalize mb-0 fw-bold mt-1">{user?.name}</p>
        </div>
        <nav className="flex-grow-1 ps-2">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/my/dashboard"}>
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/my/profile/edit"}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"orders"}>
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/my/address"}>
                Addresses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/my/user/delete"}>
                Delete Account
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
      <div className="container-fluid mt-3 flex-grow-1 position-relative d-flex justify-content-between align-items-center">
        <main className="flex-grow-1 p-4 w-100 h-100 mt-sm-4 userProfilePageMain">
          <Outlet />
        </main>
        <button
          className="btn btn-pink d-lg-none position-absolute"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#demo"
          style={{ top: "3px", right: "30px", zIndex: 1000 }}
        >
          <FaBars size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
