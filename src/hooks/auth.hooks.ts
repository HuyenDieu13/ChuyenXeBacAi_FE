import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    VerifyEmailRequest,
    UpdateStatusRequest,
    SentOtpRequest,
    ResetPasswordRequest
} from "@/types/auth.type";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/config/AxiosConfig";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: LoginRequest) => authService.logIn(data),
        onSuccess: (res: LoginResponse) => {
            const token = res.access_token;
            if (token) {
                localStorage.setItem("accessToken", token);

                toast.success("Đăng nhập thành công");
                navigate({ to: "/admin/dashboard" });
            } else {
                toast.error("Đăng nhập thất bại");
            }
        },
        onError: () => {
            toast.error("Đăng nhập thất bại");
        }
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (data: RegisterRequest) => authService.register(data),
        onSuccess: () => {
            toast.success("Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.");
            navigate({ to: "/login" });
        },
        onError: () => {
            toast.error("Đăng ký thất bại");
        }
    });
};

export const useUpdateStatus = (id: string) => {
    return useMutation({
        mutationKey: ["updateStatus", id],
        mutationFn: (data: UpdateStatusRequest) => authService.updateStatus(id, data),
        onSuccess: () => {
            toast.success("Cập nhật trạng thái thành công");
        },
        onError: () => {
            toast.error("Cập nhật trạng thái thất bại");
        }
    });
}

export const useSendOtp = () => {
    return useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: (data: SentOtpRequest) => authService.sendOtp(data),
        onSuccess: () => {
            toast.success("Gửi mã OTP thành công. Vui lòng kiểm tra email.");
        },
        onError: () => {
            toast.error("Gửi mã OTP thất bại");
        }
    });
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (p: { id: string }) => {
      return httpClient.post(`/api/Auth/${p.id}/reset-password`);
    },

    onSuccess: (res: any) => {
      toast.success(
        res?.data?.message || "Đã gửi mật khẩu mới về email"
      );
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          "Reset mật khẩu thất bại"
      );
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
        }
    });
}

export const useLogout = () => {    
    const navigate = useNavigate();
    return () => {
        localStorage.removeItem("accessToken");
        toast.success("Đăng xuất thành công");
        navigate({ to: "/home" });
    };
}
