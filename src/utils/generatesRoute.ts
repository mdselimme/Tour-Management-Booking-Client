import type { ISideBarItem } from "@/types";



export const generateRoutes = (sidebarItems: ISideBarItem[]) => {
    return sidebarItems.flatMap((section) =>
        section.items.map((route) => ({
            path: route.url,
            Component: route.component,
        }))
    );
};

