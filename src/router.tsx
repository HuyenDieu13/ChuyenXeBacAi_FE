import { createRouter, RouterProvider } from "@tanstack/react-router";
import { authRoute } from "./routes/auth/layout";
import { adminRoute } from "./routes/admin/layout";
import { homeRoute } from "@/routes/home/layout";
import {
  adminIndexRoute,
  adminVolunteersRoute,
  adminVolunteerIndexRoute,
  adminVolunteerDetailRoute,
  editAdminVolunteerFormRoute,
  addAdminVolunteerFormRoute,
  adminCampaignsRoute,
  adminCampaignIndexRoute,
  addAdminCampaignFormRoute,
  editAdminCampaignFormRoute,
  adminCampaignDetailRoute,
  adminSessionsRoute,
  adminSessionIndexRoute,
  addAdminSessionFormRoute,
  editAdminSessionFormRoute,
  adminParticipantsRoute,
  adminParticipantIndexRoute,
  addAdminParticipantFormRoute,
  editAdminParticipantFormRoute,
  adminFinanceRoute,
  adminFinanceIndexRoute,
  addAdminFinanceFormRoute,
  editAdminFinanceFormRoute,
  adminPostsRoute,
  adminPostIndexRoute,
  addAdminPostFormRoute,
  editAdminPostFormRoute,
} from "./routes/admin";
import {
  homeIndexRoute,
  journeyIndexRoute,
  membersIndexRoute,
  journeyFundIndexRoute,
  journeyFundDetailRoute,
  contactIndexRoute,
  aboutIndexRoute,
  volunteerCheckinRoute,
  volunteerTasksRoute,
  myStatsRoute,
} from "./routes/home";
import { rootRoute } from "@/routes/root";
import {
  loginIndexRoute,
  resetPasswordRoute,
  registerIndexRoute,
  forgotPasswordRoute,
  verifyOtpRoute
} from "./routes/auth";
const routeTree = rootRoute.addChildren(
  [
    authRoute.addChildren([
      loginIndexRoute,
      registerIndexRoute,
      forgotPasswordRoute,
      resetPasswordRoute,
      verifyOtpRoute,
    ]),
    homeRoute.addChildren([
      homeIndexRoute,
      journeyIndexRoute,
      membersIndexRoute,
      journeyFundIndexRoute,
      journeyFundDetailRoute,
      contactIndexRoute,
      aboutIndexRoute,
      volunteerTasksRoute,
      myStatsRoute,
    ]),
    adminRoute.addChildren([
      adminIndexRoute,
      adminVolunteersRoute.addChildren([
        adminVolunteerIndexRoute,
        adminVolunteerDetailRoute,
        addAdminVolunteerFormRoute,
        editAdminVolunteerFormRoute,
      ]),
      adminCampaignsRoute.addChildren([
        adminCampaignIndexRoute,
        addAdminCampaignFormRoute,
        editAdminCampaignFormRoute,
        adminCampaignDetailRoute.addChildren([
          adminSessionsRoute.addChildren([
            adminSessionIndexRoute,
            addAdminSessionFormRoute,
            editAdminSessionFormRoute,
          ]),
          adminParticipantsRoute.addChildren([
            adminParticipantIndexRoute,
            addAdminParticipantFormRoute,
            editAdminParticipantFormRoute,
          ]),
          adminFinanceRoute.addChildren([
            adminFinanceIndexRoute,
            addAdminFinanceFormRoute,
            editAdminFinanceFormRoute,  
          ]),
          adminPostsRoute.addChildren([
            adminPostIndexRoute,
            addAdminPostFormRoute,
            editAdminPostFormRoute, 
          ]),
        ]),
      ])
    ]),
  ]
);

export const router = createRouter({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}