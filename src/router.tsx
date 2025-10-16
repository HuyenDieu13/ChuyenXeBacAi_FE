import { createRouter, RouterProvider } from "@tanstack/react-router";
import { homeRoute } from "@/routes/home/layout";
import { 
  homeIndexRoute,
  journeyIndexRoute,
} from "./routes/home";
import { rootRoute } from "@/routes/root";
const routeTree = rootRoute.addChildren(
  [
    homeRoute.addChildren([
      homeIndexRoute,
      journeyIndexRoute,
    ])
  ]
);

export const router = createRouter({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}