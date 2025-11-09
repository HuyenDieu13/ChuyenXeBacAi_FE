import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { demoVolunteers } from "./volunteerData";
import { ArrowLeft, Save } from "lucide-react";

const VolunteerFormModal: React.FC = () => {
  const { volunteerId } = useParams({ from: "/admin/volunteers/form/:volunteerId?" });
  const navigate = useNavigate();

  const existingVolunteer = demoVolunteers.find((v) => v.id === volunteerId);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "PENDING",
    rating: 0,
    joinedSessions: 0,
  });

  useEffect(() => {
    if (existingVolunteer) {
      setForm({
        name: existingVolunteer.name,
        email: existingVolunteer.email,
        phone: existingVolunteer.phone || "",
        status: existingVolunteer.status,
        rating: existingVolunteer.rating,
        joinedSessions: existingVolunteer.joinedSessions,
      });
    }
  }, [volunteerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerId) {
      alert(`✅ Cập nhật thành công tình nguyện viên: ${form.name}`);
    } else {
      alert(`✅ Thêm mới tình nguyện viên: ${form.name}`);
    }
    navigate({ to: "/admin/volunteers" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate({ to: "/admin/volunteers" })}
          className="flex items-center text-[#355C7D] hover:underline text-sm"
        >
          <ArrowLeft size={18} className="mr-2" /> Quay lại danh sách
        </button>
        <h2 className="text-xl font-bold text-[#355C7D]">
          {volunteerId ? "Chỉnh sửa tình nguyện viên" : "Thêm mới tình nguyện viên"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            >
              <option value="PENDING">Chờ duyệt</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Ngưng hoạt động</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Điểm đánh giá
            </label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              step="0.1"
              min="0"
              max="5"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Số buổi tham gia
            </label>
            <input
              type="number"
              name="joinedSessions"
              value={form.joinedSessions}
              min="0"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#355C7D] outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#2D4862] text-white px-6 py-2 rounded-full shadow transition"
          >
            <Save size={18} /> {volunteerId ? "Lưu thay đổi" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerFormModal;
