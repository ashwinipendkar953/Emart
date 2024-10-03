import ProductsDisplayPage from "../pages/ProductsDisplayPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const ProductRoutes = [
  {
    path: "products",
    element: <ProductsDisplayPage />,
  },

  {
    path: "products/details/:productId",
    element: <ProductDetailsPage />,
  },
];

export default ProductRoutes;
