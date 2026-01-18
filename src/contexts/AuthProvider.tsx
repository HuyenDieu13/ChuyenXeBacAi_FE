import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserMe } from "@/hooks/user.hook";
interface AuthContextValue {
  user: any | null;
  userId?: string;
  role?: string;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("access_token"));

  // Re-run user query whenever token changes. We listen to both a custom
  // "auth" event (dispatched on login/logout in this tab) and the
  // native "storage" event for cross-tab updates.
  useEffect(() => {
    const onAuth = () => setToken(localStorage.getItem("access_token"));
    const onStorage = (e: StorageEvent) => {
      if (e.key === "access_token") setToken(localStorage.getItem("access_token"));
    };
    window.addEventListener("auth", onAuth);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("auth", onAuth);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const { data, isLoading } = useUserMe(token ?? undefined);

  const value: AuthContextValue = {
    user: data ?? null,
    userId: data?.id,
    role: data?.roles?.length ? data.roles[0].code : undefined,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
