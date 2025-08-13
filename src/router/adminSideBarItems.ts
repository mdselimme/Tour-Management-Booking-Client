import AddTour from "@/Pages/Admin/AddTour";
import AddTourType from "@/Pages/Admin/AddTourType";
import Analytics from "@/Pages/Admin/Analytics";
import type { ISideBarItem } from "@/types";

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
                title: "Add Tour",
                url: "/admin/add-tour",
                component: AddTour
            },
            {
                title: "Add Tour Type",
                url: "/admin/add-tour-type",
                component: AddTourType
            },
        ],
    },
]