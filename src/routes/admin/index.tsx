import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { adminRoute } from "./layout";
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import VolunteerListPage from "@/pages/admin/volunteers/VolunteerListPage";
import VolunteerDetailModal from "@/pages/admin/volunteers/VolunteerDetailModal";
import VolunteerFormModal from "@/pages/admin/volunteers/VolunteerFormModal";
import CampaignListPage from "@/pages/admin/campaigns/CampaignListPage";
import CampaignFormPage from "@/pages/admin/campaigns/CampaignFormModal";
import SessionListPage from "@/pages/admin/campaigns/sessions/SessionListPage";
import SessionFormPage from "@/pages/admin/campaigns/sessions/SessionFormData";
export const adminIndexRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/dashboard",
    component: AdminDashboardPage,
})  

export const adminVolunteersRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/volunteers",
    component: () => <div><Outlet /></div>,
})

// Volunteers Routes
export const adminVolunteerIndexRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute,
    path: "/",
    component: VolunteerListPage

})
export const adminVolunteerDetailRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute,
    path: "/$id",
    component: VolunteerDetailModal,
})

export const addAdminVolunteerFormRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute,
    path: "/form",
    component: VolunteerFormModal,
})
export const editAdminVolunteerFormRoute = createRoute({
    getParentRoute: () => adminVolunteersRoute, 
    path: "/form/$id",
    beforeLoad: ({params}) => {
        if (!params.id) {
            throw redirect ({to: adminVolunteersRoute.to})
        }
    },
    component: VolunteerFormModal,
})  

// Campaigns Routes
export const adminCampaignsRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: "/campaigns",
    component: () => <div><Outlet /></div>,
})

export const adminCampaignIndexRoute = createRoute({
    getParentRoute: () => adminCampaignsRoute,
    path: "/",
    component: CampaignListPage,
})

export const addAdminCampaignFormRoute = createRoute({
    getParentRoute: () => adminCampaignsRoute,
    path: "form",
    component: CampaignFormPage,
})

export const editAdminCampaignFormRoute = createRoute({
    getParentRoute: () => adminCampaignsRoute,
    path: "form/$id",
    beforeLoad: ({ params }) => {
        if (!params.id) {
            throw redirect({ to: adminCampaignsRoute.to });
        }
    },
    component: CampaignFormPage,
})

export const adminSessionsRoute = createRoute({
    getParentRoute: () => adminCampaignsRoute,
    path: "$id/sessions",
    component: () => <div><Outlet /></div>,
})

export const adminSessionIndexRoute = createRoute({
    getParentRoute : () => adminSessionsRoute,
    path: "/",
    component: SessionListPage,
})
export const addAdminSessionFormRoute = createRoute({
  getParentRoute: () => adminSessionsRoute,
  path: "form", // optional param
  component: SessionFormPage,
});

export const editAdminSessionFormRoute = createRoute({
  getParentRoute: () => adminSessionsRoute,
  path: "form/$sessionId",
  beforeLoad: ({ params }) => {
    if (!params.sessionId) {
      throw redirect({ to: adminSessionsRoute.to });
    }
  },
  component: SessionFormPage,
});