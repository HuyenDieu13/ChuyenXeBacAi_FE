// src/pages/admin/volunteers/VolunteerFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Upload, } from "lucide-react";
import { demoVolunteers } from "./volunteerData";
import { VolunteerResource, VolunteerRole, VolunteerStatus } from "@/types/volunteer.type";

const VolunteerFormPage: React.FC = () => {
  const { id: volunteerId } = useParams({ strict: false });
  const navigate = useNavigate();

  const isEditMode = Boolean(volunteerId);
  const existingVolunteer = isEditMode
    ? demoVolunteers.find((v) => v.id === volunteerId)
    : null;

  const [form, setForm] = useState<VolunteerResource>(
    existingVolunteer || {
      id: "",
      fullName: "",
      email: "",
      phone: "",
      avatar: "",
      role: VolunteerRole.VOLUNTEER,
      status: VolunteerStatus.PENDING,
      joinedAt: new Date().toISOString(),
      campaigns: [],
      points: 0,
      adminNote: "",
    }
  );

  const [preview, setPreview] = useState<string | null>(existingVolunteer?.avatar || null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      alert("Cập nhật tình nguyện viên thành công!");
    } else {
      alert("Thêm tình nguyện viên thành công!");
    }
    navigate({ to: "/admin/volunteers" });
  };

  const handleBack = () => navigate({ to: "/admin/volunteers" });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-2 items-center mb-6">
        <button
          onClick={() => navigate({ to: "/admin/volunteers" })}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          {existingVolunteer ? "Chỉnh sửa tình nguyện viên" : "Tạo tình nguyện viên mới"}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
        {/* Upload avatar */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Ảnh đại diện
          </label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-40 bg-gray-100 rounded-full flex justify-center items-center overflow-hidden border border-gray-200">
              {preview ? (
                <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload size={32} className="text-gray-400" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
          </div>
        </div>

        {/* Tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Họ tên
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nhập họ tên..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            />
          </div>
        </div>

        {/* Vai trò + Trạng thái */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Vai trò
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            >
              <option value="VOLUNTEER">Tình nguyện viên</option>
              <option value="COORDINATOR">Điều phối viên</option>
              <option value="LEADER">Trưởng nhóm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Trạng thái
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            >
              <option value="PENDING">Chờ duyệt</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="REJECTED">Từ chối</option>
              <option value="LOCKED">Khóa</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Ngừng</option>
            </select>
          </div>
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Ghi chú admin
          </label>
          <textarea
            name="adminNote"
            value={form.adminNote}
            onChange={handleChange}
            placeholder="Ghi chú nội bộ..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Nút */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/volunteers" })}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-5 py-2 rounded-full text-sm shadow-sm transition"
          >
            <Save size={16} /> {existingVolunteer ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerFormPage;