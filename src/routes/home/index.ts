import { createRoute, Outlet } from "@tanstack/react-router";
import { homeRoute } from "./layout";
import HomePage from "@/pages/home/HomePage";
import JourneyPage from "@/pages/home/JourneyPage";
import MembersPage from "@/pages/home/MembersPage";
import JourneyFundPage from "@/pages/home/JourneyFundPage";
import JourneyFundDetailPage from "@/pages/home/JourneyFundDetailPage";
import ContactPage from "@/pages/home/ContactPage";
import AboutPage from "@/pages/home/AboutPage";
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

export const membersIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "members",
    component: MembersPage,
})

export const journeyFundIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "fund",
    component: JourneyFundPage,
})

export const journeyFundDetailRoute = createRoute({
    getParentRoute: () => homeRoute,
    // path: "fund/:id",
    path: "fund/fundDetail",
    component: JourneyFundDetailPage,
})

export const contactIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "contact",
    component: ContactPage,
})

export const aboutIndexRoute = createRoute({
    getParentRoute: () => homeRoute,
    path: "about",
    component: AboutPage,
});
