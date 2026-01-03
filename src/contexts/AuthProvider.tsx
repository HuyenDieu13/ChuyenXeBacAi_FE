import React, { createContext, useContext } from "react";
import { useUserMe } from "@/hooks/user.hook";
interface AuthContextValue {
  user: any | null;
  userId?: string;
  role?: string;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading } = useUserMe();

  const value: AuthContextValue = {
    user: data ?? null,
    userId: data?.id,
    role: data?.roles.length ? data.roles[0].code : undefined,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
