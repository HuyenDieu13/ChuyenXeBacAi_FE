import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "../root"
import DashboardLayout from "@/layouts/DashboardLayout" 

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
//   id: "admin-layout",
  path: "admin",
  component: DashboardLayout,
})
