import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/Pages/About";
import Analytics from "@/Pages/Analytics";
import LoginPage from "@/Pages/Login";
import RegisterPage from "@/Pages/Register";
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
    Component: AdminLayout,
    children: [
      {
        path: "analytics",
        Component: Analytics,
      },
    ],
  },
]);
