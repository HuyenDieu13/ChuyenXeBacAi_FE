import { createRouter, RouterProvider } from "@tanstack/react-router";
import { authRoute } from "./routes/auth/layout";
import { homeRoute } from "@/routes/home/layout";
import { 
  homeIndexRoute,
  journeyIndexRoute,
  membersIndexRoute,
  journeyFundIndexRoute,
  journeyFundDetailRoute,
  contactIndexRoute,
  aboutIndexRoute,
} from "./routes/home";
import { rootRoute } from "@/routes/root";
import { loginIndexRoute, resetPasswordRoute } from "./routes/auth";
import { signInIndexRoute } from "./routes/auth";
import { forgotPasswordRoute } from "./routes/auth";
import { verifyOtpRoute } from "./routes/auth";
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
    ])
  ]
);

export const router = createRouter({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}