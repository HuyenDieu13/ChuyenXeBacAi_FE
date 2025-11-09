import { createRoute, Outlet } from "@tanstack/react-router";
import { adminRoute } from "./layout";
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import VolunteerListPage from "@/pages/admin/volunteers/VolunteerListPage";
import VolunteerDetailModal from "@/pages/admin/volunteers/VolunteerDetailModal";
import VolunteerFormModal from "@/pages/admin/volunteers/VolunteerFormModal";

export const adminIndexRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/dashboard",
    component: AdminDashboardPage,
})  

export const adminVolunteersRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/volunteers",
    component: VolunteerListPage,
})

export const adminVolunteerDetailRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute,
    path: "/:volunteerId",
    component: VolunteerDetailModal,
})

export const adminVolunteerFormRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute, 
    path: "/form/:volunteerId?",
    component: VolunteerFormModal,
})  