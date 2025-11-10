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
  adminSessionsRoute,
  adminSessionIndexRoute,
  addAdminSessionFormRoute,
  editAdminSessionFormRoute,
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
  signInIndexRoute,
  forgotPasswordRoute,
  verifyOtpRoute
} from "./routes/auth";
const routeTree = rootRoute.addChildren(
  [
    authRoute.addChildren([
      loginIndexRoute,
      signInIndexRoute,
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
      editAdminVolunteerFormRoute,
      addAdminVolunteerFormRoute
    ]),
    adminCampaignsRoute.addChildren([
      adminCampaignIndexRoute,
      addAdminCampaignFormRoute,
      editAdminCampaignFormRoute,
      adminSessionsRoute.addChildren([
        adminSessionIndexRoute,
        addAdminSessionFormRoute,
        editAdminSessionFormRoute,
      ]),     
    ]),
  ]),
  ]
);

export const router = createRouter({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}