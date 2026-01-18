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
  adminUsersRoute,
  adminUserIndexRoute,
  addAdminUserFormRoute,
  editAdminUserFormRoute,
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
  adminCampaignMediaRoute,
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
  profileRoute,
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
      volunteerCheckinRoute,
      profileRoute,
    ]),
    adminRoute.addChildren([
      adminIndexRoute,
      adminVolunteersRoute.addChildren([
        adminVolunteerIndexRoute,
        adminVolunteerDetailRoute,
        addAdminVolunteerFormRoute,
        editAdminVolunteerFormRoute,
      ]),
      adminUsersRoute.addChildren([
        adminUserIndexRoute,
        addAdminUserFormRoute,
        editAdminUserFormRoute, 
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
          adminCampaignMediaRoute,
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