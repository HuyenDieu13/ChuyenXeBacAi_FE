import { create } from "zustand";
import Cookies from "js-cookie";
// import { UserResource } from "@/types/user.type";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
//   user: UserResource | null;
  setAuth: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,

  setAuth: (token, refreshToken) => {
    Cookies.set("accessToken", token, { expires: 7 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
    set({ token, refreshToken });
  },

  clearAuth: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ token: null, refreshToken: null });
  },
}));