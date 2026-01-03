// layouts/RootLayout.tsx
import { Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/contexts/AuthProvider";
const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default RootLayout;
