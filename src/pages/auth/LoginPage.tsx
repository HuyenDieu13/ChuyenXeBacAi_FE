import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { useLogin } from "@/hooks/auth.hook";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Định dạng email không hợp lệ.");
      return;
    }

    // Nếu hợp lệ → reset lỗi & điều hướng
    setError("");
    login({ email, password });
  };

  return (
    <div className="relative z-10 p-6">
      {/* Logo + title */}
      <div>
        <h1 className="text-3xl font-bold text-[#2F2F2F] mb-2">Đăng nhập</h1>
        <p className="text-gray-600 text-sm">
          Chào mừng bạn quay lại với{" "}
          <span className="text-[#FFB800] font-semibold">Chuyến Xe Bác Ái</span> 🚐
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          disabled={isPending}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 rounded-md bg-white/70 border border-white/60 shadow-inner px-4
                     text-[#2F2F2F] placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          disabled={isPending}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 rounded-md bg-white/70 border border-white/60 shadow-inner px-4
                     text-[#2F2F2F] placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
        />

        {error && (
          <p className="text-[#E53935] text-sm mt-1 font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="h-10 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] transition"
        >
          {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {/* Forgot password */}
      <div className="text-right mt-3">
        <Link
          to="/forgot-password"
          className="text-sm text-[#355C7D] hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      {/* Social login */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md 
               border border-[#FFB800]/60 text-[#355C7D] hover:bg-[#FFB800] hover:text-white 
               transition duration-300"
          title="Đăng nhập bằng Google"
        >
          <FaGoogle size={16} />
        </button>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md 
               border border-[#FFB800]/60 text-[#355C7D] hover:bg-[#FFB800] hover:text-white 
               transition duration-300"
          title="Đăng nhập bằng Facebook"
        >
          <FaFacebookF size={16} />
        </button>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md 
               border border-[#FFB800]/60 text-[#355C7D] hover:bg-[#FFB800] hover:text-white 
               transition duration-300"
          title="Đăng nhập bằng Twitter"
        >
          <FaTwitter size={16} />
        </button>
      </div>

      {/* Redirect to Sign-up */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Chưa có tài khoản?{" "}
        <Link
          to="/sign-in"
          className="text-[#355C7D] font-semibold hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};


export default LoginPage;
