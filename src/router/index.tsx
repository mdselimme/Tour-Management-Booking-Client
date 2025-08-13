import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/Pages/About";
import LoginPage from "@/Pages/Login";
import RegisterPage from "@/Pages/Register";
import Verify from "@/Pages/Verify";
import { generateRoutes } from "@/utils/generatesRoute";
import { createBrowserRouter } from "react-router";
import { AdminSidBarItems } from "./adminSideBarItems";
import { UserSidebarItems } from "./userSideBarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: RegisterPage,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [...generateRoutes(AdminSidBarItems)],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [...generateRoutes(UserSidebarItems)],
  },
]);
