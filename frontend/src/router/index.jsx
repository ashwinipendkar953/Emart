import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminRoutes from "./AdminRoutes";
import ProductRoutes from "./ProductRoutes";
import UserRoutes from "./UserRoutes";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },

      ...AdminRoutes,
      ...ProductRoutes,
      ...UserRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

]);

export default routes;
