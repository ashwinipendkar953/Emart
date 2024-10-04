import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./features/user/userSlice";
import { authResetState } from "./features/auth/authSlice";
import { getCartItems } from "./features/cart/cartSlice";
import { getCountWishlistProducts } from "./features/wishlist/wishlistSlice";

const App = () => {
  const dispatch = useDispatch();
  const { message, isSuccess, isError } = useSelector((state) => state.auth);
  const [shouldReload, setShouldReload] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
        autoClose: 2000,
        onClose: () => {
          setShouldReload(true);
          setTimeout(() => dispatch(authResetState()), 500);
        },
      });
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
        autoClose: 2000,
        onOpen: () => {
          setShouldReload(false);
        },
      });
      dispatch(authResetState());
    }
  }, [isSuccess, isError, message, dispatch]);

  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => {
        dispatch(fetchUserDetails());
        setShouldReload(false);
      }, 200);
    }
  }, [shouldReload, dispatch]);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(getCartItems());
    dispatch(getCountWishlistProducts());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000}/>
      <Header key={key} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
