// routes/root.ts
import { createRootRoute, redirect } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("accessToken");
    const pathname = location.pathname;

    const isAuthenticated = !!token;

    // /
    if (pathname === "/") {
      throw redirect({ to: isAuthenticated ? "/admin" : "/home" });
    }

    // Chặn admin
    if (!isAuthenticated && pathname.startsWith("/admin")) {
      throw redirect({ to: "/login" });
    }

    // Đã login mà vào login
    if (isAuthenticated && pathname.startsWith("/login")) {
      throw redirect({ to: "/admin" });
    }
  },
});
