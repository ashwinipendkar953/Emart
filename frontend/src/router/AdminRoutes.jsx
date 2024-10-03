import AdminPanelPage from "../pages/AdminPanelPage";
import AllUsers from "../features/admin/AllUsersPage";
import AllProducts from "../features/admin/AllProductsPage";
import AllCategoriesPage from "../features/admin/AllCategoriesPage";

const AdminRoutes = [
  {
    path: "admin-panel",
    element: <AdminPanelPage />,
    children: [
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "all-categories",
        element: <AllCategoriesPage />,
      },
    ],
  },
];

export default AdminRoutes;
