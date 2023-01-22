import { Navigate } from "react-router";
import { Landing, LoginLayout, UsersPanel, AdminPanel } from "../layouts";

import LoginLayoutSignIn from "../pages/LoginLayout/SignIn";
import LoginLayoutSignUp from "../pages/LoginLayout/SignUp";

import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import landingRoutes from "./landingRoutes";

const NeedAuth = () => <Navigate to="/sign-in" replace />;

const routes = (isLogged = false, role = "") => {
  const checkRole = (roles = []) =>
    isLogged && ["super", "admin", ...roles].includes(role);
  return [
    {
      path: "/",
      element: <Landing />,
      children: landingRoutes(isLogged),
    },
    {
      path: "/sign-in",
      element: <LoginLayout />,
      children: [
        {
          path: "",
          element: <LoginLayoutSignIn />,
        },
      ],
    },
    {
      path: "/sign-up",
      element: <LoginLayout />,
      children: [
        {
          path: "",
          element: <LoginLayoutSignUp />,
        },
      ],
    },
    {
      path: "/",
      element: checkRole(["student", "unregistered"]) ? (
        <UsersPanel />
      ) : (
        <NeedAuth />
      ),
      children: userRoutes,
    },
    {
      path: "/admin",
      element: checkRole() ? <AdminPanel /> : <NeedAuth />,
      children: adminRoutes,
    },
    {
      path: "*",
      element: <h1 className="text-center display-1 py-5">404</h1>,
    },
  ];
};
export default routes;
