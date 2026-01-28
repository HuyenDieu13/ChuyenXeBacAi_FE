// routes/root.ts
import { createRootRoute, redirect } from "@tanstack/react-router";
import RootLayout from "@/layouts/RootLayout";
export const rootRoute = createRootRoute({
  component: RootLayout,
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("access_token");
    const rawRole = localStorage.getItem("role");
    const role = rawRole ? rawRole.toUpperCase() : rawRole;
    const pathname = location.pathname;

    const isAuthenticatedAdmin =
      !!token && (role === "ADMIN" || role === "MANAGER");

    if (pathname === "/") {
      throw redirect({ to: isAuthenticatedAdmin ? "/admin" : "/home" });
    }

    // Chặn admin
    if (!isAuthenticatedAdmin && pathname.startsWith("/admin")) {
      throw redirect({ to: "/login" });
    }

    // Đã login mà vào login
    if (isAuthenticatedAdmin && pathname.startsWith("/login")) {
      throw redirect({ to: "/admin" });
    }
  },
});
