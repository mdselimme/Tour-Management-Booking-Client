import AddDivision from "@/Pages/Admin/AddDivision";
import AddTour from "@/Pages/Admin/AddTour";
import AddTourType from "@/Pages/Admin/AddTourType";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/Pages/Admin/Analytics"));

export const AdminSidBarItems: ISideBarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            },
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add Tour Type",
                url: "/admin/add-tour-type",
                component: AddTourType
            },
            {
                title: "Add Division",
                url: "/admin/add-division",
                component: AddDivision
            },
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component: AddTour
            },
        ],
    },
]