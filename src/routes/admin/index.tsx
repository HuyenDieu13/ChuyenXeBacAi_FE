import { createRoute, Outlet, redirect, useParams } from "@tanstack/react-router";
import { adminRoute } from "./layout";

// Pages
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import VolunteerListPage from "@/pages/admin/volunteers/VolunteerListPage";
import VolunteerFormPage from "@/pages/admin/volunteers/VolunteerFormPage";
import VolunteerPendingModal from "@/pages/admin/volunteers/VolunteerPendingModal";
import CampaignListPage from "@/pages/admin/campaigns/CampaignListPage";
import CampaignFormPage from "@/pages/admin/campaigns/CampaignFormPage";
import CampaignDetailPage from "@/pages/admin/campaigns/CampaignDetail";

import SessionListPage from "@/pages/admin/campaigns/sessions/SessionListPage";
import SessionFormPage from "@/pages/admin/campaigns/sessions/SessionFormPage";

import ParticipantsListPage from "@/pages/admin/campaigns/participants/ParticipantListPage";
import ParticipantFormPage from "@/pages/admin/campaigns/participants/ParticipantFormPage";

import FinanceListPage from "@/pages/admin/campaigns/finances/FinanceListPage";
import FinanceFormPage from "@/pages/admin/campaigns/finances/FinanceFormPage";

import PostsListPage from "@/pages/admin/campaigns/posts/PostListPage";
import PostFormPage from "@/pages/admin/campaigns/posts/PostFormPage";
// ======================= ADMIN DASHBOARD =======================
export const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/dashboard",
  component: AdminDashboardPage,
});

// ======================= VOLUNTEERS =======================
export const adminVolunteersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/volunteers",
  component: () => <Outlet />,
});

export const adminVolunteerIndexRoute = createRoute({
  getParentRoute: () => adminVolunteersRoute,
  path: "/",
  component: VolunteerListPage,
});

export const adminVolunteerDetailRoute = createRoute({
  getParentRoute: () => adminVolunteersRoute,
  path: "/$id",
  component: VolunteerFormPage,
});

export const addAdminVolunteerFormRoute = createRoute({
  getParentRoute: () => adminVolunteersRoute,
  path: "/form",
  component: VolunteerFormPage,
});

export const editAdminVolunteerFormRoute = createRoute({
  getParentRoute: () => adminVolunteersRoute,
  path: "/form/$id",
  beforeLoad: ({ params }) => {
    if (!params.id) throw redirect({ to: "/admin/volunteers" });
  },
  component: VolunteerFormPage,
});

// ======================= CAMPAIGNS ROOT =======================
export const adminCampaignsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/campaigns",
  component: () => <Outlet />,
});

// Danh sách chiến dịch
export const adminCampaignIndexRoute = createRoute({
  getParentRoute: () => adminCampaignsRoute,
  path: "/",
  component: CampaignListPage,
});

// Form thêm/sửa chiến dịch
export const addAdminCampaignFormRoute = createRoute({
  getParentRoute: () => adminCampaignsRoute,
  path: "/form",
  component: CampaignFormPage,
});

export const editAdminCampaignFormRoute = createRoute({
  getParentRoute: () => adminCampaignsRoute,
  path: "/form/$id",
  beforeLoad: ({ params }) => {
    if (!params.id) throw redirect({ to: "/admin/campaigns" });
  },
  component: CampaignFormPage,
});

// ======================= CHI TIẾT CHIẾN DỊCH (CÓ TAB) =======================
export const adminCampaignDetailRoute = createRoute({
  getParentRoute: () => adminCampaignsRoute,
  path: "/$id",
  component: CampaignDetailPage, // ← Layout chính (header + tabs + info)
});

// ======================= SESSIONS – LÀ CON CỦA DETAIL =======================
export const adminSessionsRoute = createRoute({
  getParentRoute: () => adminCampaignDetailRoute, // ← QUAN TRỌNG: là con của detail
  path: "sessions",
  component: () => <Outlet />, // để render list hoặc form
});

// Danh sách buổi
export const adminSessionIndexRoute = createRoute({
  getParentRoute: () => adminSessionsRoute,
  path: "/",
  component: () => {
    const { id } = useParams({ from: adminCampaignDetailRoute.id }); // lấy $id từ parent
    return <SessionListPage campaignId={id} />;
  },
});

// Form thêm buổi
export const addAdminSessionFormRoute = createRoute({
  getParentRoute: () => adminSessionsRoute,
  path: "/form",
  component: SessionFormPage,
});

// Form sửa buổi
export const editAdminSessionFormRoute = createRoute({
  getParentRoute: () => adminSessionsRoute,
  path: "/form/$sessionId",
  component: SessionFormPage,
});


// ======================= PARTICIPANTS – LÀ CON CỦA DETAIL =======================
export const adminParticipantsRoute = createRoute({
  getParentRoute: () => adminCampaignDetailRoute, // ← QUAN TRỌNG: là con của detail
  path: "participants",
  component: () => <Outlet />, // để render list hoặc form
});

// Danh sách thành viên
export const adminParticipantIndexRoute = createRoute({
  getParentRoute: () => adminParticipantsRoute,
  path: "/",
  component: () => {
    const { id } = useParams({ from: adminCampaignDetailRoute.id }); // lấy $id từ parent
    return <ParticipantsListPage campaignId={id} />;
  },
});

// Form thêm thành viên
export const addAdminParticipantFormRoute = createRoute({
  getParentRoute: () => adminParticipantsRoute,
  path: "/form",
  component: ParticipantFormPage,
});

// Form sửa thành viên
export const editAdminParticipantFormRoute = createRoute({
  getParentRoute: () => adminParticipantsRoute,
  path: "/form/$participantId",
  component: ParticipantFormPage,
});

export const adminFinanceRoute = createRoute({  
  getParentRoute: () => adminCampaignDetailRoute, // ← QUAN TRỌNG: là con của detail
  path: "finance",
  component: () => <Outlet />, // để render list hoặc form
});

// Danh sách quỹ
export const adminFinanceIndexRoute = createRoute({
  getParentRoute: () => adminFinanceRoute,
  path: "/",
  component: () => {
    const { id } = useParams({ from: adminCampaignDetailRoute.id }); // lấy $id từ parent
    return <FinanceListPage campaignId={id} />;
  },
});

export const addAdminFinanceFormRoute = createRoute({
  getParentRoute: () => adminFinanceRoute,  
  path: "/form",
  component: FinanceFormPage,
});

export const editAdminFinanceFormRoute = createRoute({
  getParentRoute: () => adminFinanceRoute,
  path: "/form/$transactionId",
  component: FinanceFormPage,
});

// ======================= POSTS – LÀ CON CỦA DETAIL =======================
export const adminPostsRoute = createRoute({
  getParentRoute: () => adminCampaignDetailRoute, // ← QUAN TRỌNG: là con của detail
  path: "posts",
  component: () => <Outlet />, // để render list hoặc form
});

export const adminPostIndexRoute = createRoute({  
  getParentRoute: () => adminPostsRoute,
  path: "/",
  component: () => {
    const { id } = useParams({ from: adminCampaignDetailRoute.id });
    return <PostsListPage campaignId={id} />;
  }
});

export const addAdminPostFormRoute = createRoute({  
  getParentRoute: () => adminPostsRoute,  
  path: "/form",
  component: PostFormPage,
});

export const editAdminPostFormRoute = createRoute({  
  getParentRoute: () => adminPostsRoute,
  path: "/form/$postId",
  component: PostFormPage,
});