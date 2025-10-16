import { createRoute, Outlet } from "@tanstack/react-router";
import { homeRoute } from "./layout";
import HomePage from "@/pages/home/HomePage";

export const homeIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "home",
    component: HomePage,
})