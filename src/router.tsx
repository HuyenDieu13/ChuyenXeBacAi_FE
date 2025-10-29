import { createRouter, RouterProvider } from "@tanstack/react-router";
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
const routeTree = rootRoute.addChildren(
  [
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