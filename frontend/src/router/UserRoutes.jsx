import UserProfilePage from "../pages/UserProfilePage";
import UserDashboard from "../features/user/UserDashboard";
import EditProfile from "../features/user/EditProfile";
import UserOrders from "../features/user/UserOrders";
import UserAddress from "../features/user/UserAddress";
import UserDeleteAccount from "../features/user/UserDeleteAccount";

const UserRoutes = [
  {
    path: "my",
    element: <UserProfilePage />,

    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "address",
        element: <UserAddress />,
      },
      {
        path: "user/delete",
        element: <UserDeleteAccount />,
      },
    ],
  },
];

export default UserRoutes;
