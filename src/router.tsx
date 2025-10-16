import { createRouter, RouterProvider } from "@tanstack/react-router";
import { homeRoute } from "@/routes/home/layout";
import { homeIndexRoute } from "./routes/home";
import { rootRoute } from "@/routes/root";
const routeTree = rootRoute.addChildren(
  [
    homeRoute.addChildren([
      homeIndexRoute,
    ])
  ]
);

export const router = createRouter({
  routeTree,
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}