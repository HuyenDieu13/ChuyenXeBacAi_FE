import { createRoute, Outlet } from "@tanstack/react-router";
import { homeRoute } from "./layout";
import HomePage from "@/pages/home/HomePage";
import JourneyPage from "@/pages/home/JourneyPage";
export const homeIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "home",
    component: HomePage,
})

export const journeyIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "journey",
    component: JourneyPage,
})


