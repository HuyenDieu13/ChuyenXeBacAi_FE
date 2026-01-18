import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyEmailRequest,
  UpdateStatusRequest,
  SentOtpRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth.type";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => authService.logIn(data),
    onSuccess: (res: LoginResponse) => {
      const token = res.access_token;
      const role = res.role;

      if (!token) {
        toast.error("Thiếu access token");
        return;
      }

      localStorage.setItem("access_token", token);
      localStorage.setItem("role", role);

      // notify other parts of the app in this tab to refresh auth state
      window.dispatchEvent(new Event("auth"));
      // invalidate so other hooks using the "me" query update if enabled
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Đăng nhập thành công");

      if (role === "ADMIN") {
        navigate({ to: "/admin/dashboard" });
      } else {
        navigate({ to: "/home" });
      }
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      toast.success(
        "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản."
      );
      navigate({ to: "/login" });
    },
    onError: () => {
      toast.error("Đăng ký thất bại");
    },
  });
};

export const useUpdateStatus = (id: string) => {
  return useMutation({
    mutationKey: ["updateStatus", id],
    mutationFn: (data: UpdateStatusRequest) =>
      authService.updateStatus(id, data),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
    },
    onError: () => {
      toast.error("Cập nhật trạng thái thất bại");
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: (data: SentOtpRequest) => authService.sendOtp(data),
    onSuccess: () => {
      toast.success("Gửi mã OTP thành công. Vui lòng kiểm tra email.");
    },
    onError: () => {
      toast.error("Gửi mã OTP thất bại");
    },
  });
};

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    Error,
    { id: string; data: ResetPasswordRequest }
  >({
    mutationKey: ["resetPassword"],
    mutationFn: ({ id, data }) => {
      return authService.resetPassword(id, data);
    },

    onSuccess: (res: ResetPasswordResponse) => {
      toast.success(res?.message || "Đã gửi mật khẩu mới về email");
    },

    onError: (err: Error) => {
      toast.error(err?.message || "Reset mật khẩu thất bại");
    },
  });
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: (data: VerifyEmailRequest) => authService.verifyEmail(data),
    onSuccess: () => {
      toast.success("Xác thực email thành công. Vui lòng đăng nhập.");
    },
    onError: () => {
      toast.error("Xác thực email thất bại");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      // Clear cached "me" data so UI reflects logged-out state immediately
      queryClient.setQueryData(["me"], null);
      // notify other parts of the app in this tab to refresh auth state
      window.dispatchEvent(new Event("auth"));
    },
    onSuccess: () => {
      toast.success("Đăng xuất thành công");
      navigate({ to: "/home" });
    },
    onError: () => {
      toast.error("Đăng xuất thất bại");
    },
  });
};
