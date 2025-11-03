import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Vui lòng nhập email của bạn.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Định dạng email không hợp lệ.");
      return;
    }

    // ✅ Giả lập gửi email khôi phục
    setTimeout(() => {
      setSuccess(
        `✅ Liên kết khôi phục mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra hộp thư của bạn.`
      );
    }, 800);
  };

  return (
    <div className="relative z-10 p-6 md:p-8 w-full">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-extrabold text-[#355C7D] text-center mb-2">
        Quên mật khẩu
      </h1>
      <p className="text-center text-gray-600 mb-8 text-sm">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu 💌
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 rounded-md border border-gray-200 px-4 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800]"
        />

        {error && <p className="text-[#E53935] text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center font-medium">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="h-10 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] transition"
        >
          Gửi liên kết khôi phục
        </button>
      </form>

      {/* Back to Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Đã nhớ mật khẩu?{" "}
        <Link
          to="/login"
          className="text-[#355C7D] font-semibold hover:underline"
        >
          Đăng nhập lại
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
