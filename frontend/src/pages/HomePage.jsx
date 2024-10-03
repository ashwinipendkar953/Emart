import { useDispatch, useSelector } from "react-redux";
import BannerProductCarousel from "../components/home/BannerProductCarousel";
import HorizontalCardProducts from "../components/home/HorizontalCardProducts";
import SubCategoryListWithProducts from "../components/home/SubCategoryListWithProducts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { cartResetState } from "../features/cart/cartSlice";
import "../css/home.css";
import BigBannerCards from "../components/home/BigBannerCards";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivalsProducts from "../components/home/NewArrivalsProducts";
import BigBannerCardsTwo from "../components/home/BigBannerCardTwo";
import { ROLE } from "../config";
import AdminPanelPage from "./AdminPanelPage";

const HomePage = () => {
  const dispatch = useDispatch();
  const { message, isSuccess, isError } = useSelector((state) => state.cart);
  const user = useSelector((state) => state?.user?.user);
  const isAdmin = user?.role === ROLE.ADMIN;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
    dispatch(cartResetState());
  }, [message, isSuccess, isError, dispatch]);

  return (
    <>
      {isAdmin ? (
        <AdminPanelPage />
      ) : (
        <div className="overflow-x-scroll scrollbar-none">
          <BannerProductCarousel />
          <SubCategoryListWithProducts />
          <div className="d-lg-block d-none">
            <HorizontalCardProducts
              subCategory={"headphones"}
              heading={"Top Headphones: Unmatched Sound Quality"}
            />
          </div>

          <BigBannerCards />
          <FeaturedProducts />
          <BigBannerCardsTwo />
          <NewArrivalsProducts />
        </div>
      )}
    </>
  );
};

export default HomePage;
