import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/Pages/About";
import LoginPage from "@/Pages/Login";
import RegisterPage from "@/Pages/Register";
import Verify from "@/Pages/Verify";
import { generateRoutes } from "@/utils/generatesRoute";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidBarItems } from "./adminSideBarItems";
import { UserSidebarItems } from "./userSideBarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constant/role";
import type { TRole } from "@/types";
import HomePage from "@/Pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: HomePage,
      },
      {
        path: "/home",
        Component: HomePage,
      },
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
    Component: withAuth(DashboardLayout, role.supeAdmin as TRole),
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(AdminSidBarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to={"/user/bookings"} /> },
      ...generateRoutes(UserSidebarItems),
    ],
  },
]);
