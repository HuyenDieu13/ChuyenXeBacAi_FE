// routes/root.ts
import { createRootRoute, redirect } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/jwt.type";

export const rootRoute = createRootRoute({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("accessToken");
    const pathname = location.pathname;

    const now = Math.floor(Date.now() / 1000);
    let isAuthenticated = false;

    // Check token
    if (token && token !== "undefined") {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded.exp && decoded.exp > now) {
          isAuthenticated = true;
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch {
        localStorage.removeItem("accessToken");
      }
    }

    // Root path
    if (pathname === "/") {
      throw redirect({ to: isAuthenticated ? "/admin" : "/home" });
    }

    // CHỈ chặn ADMIN khi chưa login
    if (!isAuthenticated && pathname.startsWith("/admin")) {
      throw redirect({ to: "/home" });
    }

  },
});
