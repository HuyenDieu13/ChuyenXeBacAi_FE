// src/pages/admin/volunteers/VolunteerFormPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useVolunteerApplicationById } from "@/hooks/volunteer-application.hook";
import { VolunteerApplicationResource } from "@/types/volunteer-application.type";
import { RegistrationStatus } from "@/enum/status.enum";
const VolunteerFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { data: volunteerApplication, isLoading } =
    useVolunteerApplicationById(id);

  const [form, setForm] = useState<VolunteerApplicationResource>({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    age: undefined,
    gender: undefined,
    address: "",
    skills: "",
    availability: "",
    apply_reason: "",
    status: RegistrationStatus.PENDING,
    created_at: "",
    reviewed_at: null,
    reject_reason: null,
    hasAccount: false,
  });

  useEffect(() => {
    if (volunteerApplication && isEditMode) {
      setForm(volunteerApplication);
    }
  }, [volunteerApplication, isEditMode]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
          {volunteerApplication
            ? "Chỉnh sửa tình nguyện viên"
            : "Tạo tình nguyện viên mới"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border space-y-6"
      >
        {/* Tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Họ tên
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Tuổi
            </label>
            <input
              type="number"
              name="age"
              value={form.age ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Giới tính
            </label>
            <select
              name="gender"
              value={form.gender ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
        </div>

        {/* Vai trò + Trạng thái */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Kỹ năng
            </label>
            <textarea
              name="skills"
              value={form.skills ?? ""}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Địa chỉ
            </label>
            <textarea
              name="address"
              value={form.address ?? ""}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
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
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Thời gian có thể tham gia
            </label>
            <input
              name="availability"
              value={form.availability ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
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
            <Save size={16} />{" "}
            {volunteerApplication ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerFormPage;
