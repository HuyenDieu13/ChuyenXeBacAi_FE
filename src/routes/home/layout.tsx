import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import HomePageLayout from '@/layouts/HomePageLayout';
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
    path: "/",
    component: HomePageLayout,
});
