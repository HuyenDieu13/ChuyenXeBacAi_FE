import { createRoute, Outlet } from "@tanstack/react-router";
import { adminRoute } from "./layout";
import AdminDashboardPage from "@/pages/admin/DashboardPage";

export const adminIndexRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/dashboard",
    component: AdminDashboardPage,
})  
