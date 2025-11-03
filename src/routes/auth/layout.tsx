import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import AuthLayout from '@/layouts/AuthLayout';
export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: AuthLayout,
});
