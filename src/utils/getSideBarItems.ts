import { role } from "@/constant/role";
import { AdminSidBarItems } from "@/router/adminSideBarItems";
import { UserSidebarItems } from "@/router/userSideBarItems";
import type { TRole } from "@/types";

export const getSideBarRoleItems = (userRole: TRole) => {
    switch (userRole) {
        case role.supeAdmin:
            return [...AdminSidBarItems];
        case role.admin:
            return [...AdminSidBarItems];
        case role.user:
            return [...UserSidebarItems];
        default:
            return [];
    }
}