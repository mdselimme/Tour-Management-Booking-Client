import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/Pages/About";
import AddTour from "@/Pages/Admin/AddTour";
import Analytics from "@/Pages/Admin/Analytics";
import LoginPage from "@/Pages/Login";
import RegisterPage from "@/Pages/Register";
import Bookings from "@/Pages/User/Bookings";
import Verify from "@/Pages/Verify";
import { createBrowserRouter } from "react-router";

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
    children: [
      {
        path: "analytics",
        Component: Analytics,
      },
      {
        path: "add-tour",
        Component: AddTour,
      },
    ],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "bookings",
        Component: Bookings,
      },
    ],
  },
]);
