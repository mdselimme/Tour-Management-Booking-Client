import Bookings from "@/Pages/User/Bookings";
import type { ISideBarItem } from "@/types";

export const UserSidebarItems: ISideBarItem[] = [
    {
        title: "History",
        items: [
            {
                title: "Booking",
                url: "/user/bookings",
                component: Bookings
            },
        ],
    },
]