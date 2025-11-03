import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) {
      setMessage("⚠️ Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== confirm) {
      setMessage("❌ Mật khẩu xác nhận không khớp.");
      return;
    }
    setMessage("✅ Mật khẩu đã được cập nhật thành công!");
  };

  return (
    <div className="relative z-10 p-6 md:p-8">
      <h1 className="text-3xl font-extrabold text-[#355C7D] text-center mb-2">
        Đặt lại mật khẩu
      </h1>
      <p className="text-center text-gray-600 mb-8 text-sm">
        Nhập mật khẩu mới của bạn bên dưới 🔐
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 rounded-md border border-gray-200 px-4 text-gray-700 
                     focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="h-10 rounded-md border border-gray-200 px-4 text-gray-700 
                     focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        />

        {message && (
          <p className="text-center text-sm font-medium text-[#355C7D]">{message}</p>
        )}

        <button
          type="submit"
          className="h-10 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] transition"
        >
          Cập nhật mật khẩu
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Quay lại{" "}
        <Link
          to="/login"
          className="text-[#355C7D] font-semibold hover:underline"
        >
          trang đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
