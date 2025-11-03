import React, { useState } from "react";
import { Link } from "@tanstack/react-router";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    volunteerType: "",
    motivation: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");
    alert(`✅ Cảm ơn ${formData.fullName}! Bạn đã đăng ký thành công 💛`);
  };

  return (
    <div className="relative z-10 p-6 md:p-8">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-extrabold text-[#355C7D] text-center mb-1">
        Viên thiện nguyện
      </h1>
      <p className="text-center text-gray-600 mb-8 text-sm">
        Cùng chung tay lan tỏa yêu thương qua mỗi hành trình 💛
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full text-sm text-[#2F2F2F]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên *"
            value={formData.fullName}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800]"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800]"
          />
        </div>

        <select
          name="volunteerType"
          value={formData.volunteerType}
          onChange={handleChange}
          className="border border-gray-200 rounded-md px-4 py-2 w-full text-gray-600 focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
        >
          <option value="">-- Chọn lĩnh vực thiện nguyện --</option>
          <option value="transport">Hỗ trợ vận chuyển / tài xế</option>
          <option value="media">Truyền thông & hình ảnh</option>
          <option value="logistics">Hậu cần / chuẩn bị hàng</option>
          <option value="medical">Hỗ trợ y tế</option>
          <option value="other">Khác</option>
        </select>

        <textarea
          name="motivation"
          rows={3}
          placeholder="Lý do bạn muốn tham gia (tùy chọn)"
          value={formData.motivation}
          onChange={handleChange}
          className="border border-gray-200 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-[#FFB800]"
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu *"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800]"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu *"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FFB800]"
          />
        </div>

        {error && (
          <p className="text-[#E53935] text-xs font-medium text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full h-10 rounded-md bg-[#FFB800] text-white font-semibold hover:bg-[#E6A400] transition"
        >
          Đăng ký ngay
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-[#355C7D] font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
