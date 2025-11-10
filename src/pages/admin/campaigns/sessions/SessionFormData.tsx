import React, { useState } from "react";
import { useParams, useNavigate, useRouterState } from "@tanstack/react-router";
import { demoSessions, Session } from "./sessionData";
import { Calendar, MapPin, Upload, Save, ArrowLeft } from "lucide-react";

const SessionFormPage: React.FC = () => {
  const router = useRouterState();
  const navigate = useNavigate();

  // 🧩 Lấy campaignId từ URL
  const { id: campaignId } = useParams({ from: "/admin/campaigns/$id/sessions" });

  // 🧩 Với route "chỉnh sửa", sẽ có param sessionId
  const isEdit = router.location.pathname.includes("/form/");
  const { sessionId } = isEdit
    ? useParams({ from: "/admin/campaigns/$id/sessions/form/$sessionId" })
    : { sessionId: undefined };

  // ✅ Lấy dữ liệu session nếu là edit
  const existingSession = sessionId
    ? demoSessions.find((s) => s.id === sessionId)
    : undefined;

  const [form, setForm] = useState<Session>(
    existingSession || {
      id: "",
      name: "",
      date: "",
      location: "",
      progress: 0,
      volunteers: [],
      banner: "",
    }
  );

  const [preview, setPreview] = useState<string | null>(
    existingSession?.banner || null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
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
    alert(
      existingSession
        ? "✅ Cập nhật buổi hoạt động thành công!"
        : "✅ Thêm buổi hoạt động mới!"
    );
    navigate({ to: `/admin/campaigns/${campaignId}/sessions` });
  };

  const handleBack = () => navigate({ to: `/admin/campaigns/${campaignId}/sessions` });

  return (
    <div className="animate-fadeIn flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 w-full max-w-3xl"
      >
        {/* Header trong form */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition"
              title="Quay lại danh sách"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#355C7D]">
              {existingSession ? "Chỉnh sửa buổi hoạt động" : "Thêm buổi hoạt động"}
            </h1>
          </div>
        </div>

        {/* Upload banner */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Banner buổi hoạt động
          </label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex justify-center items-center overflow-hidden border border-gray-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload size={32} className="text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="text-sm"
            />
          </div>
        </div>

        {/* Tên buổi */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Tên buổi hoạt động
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="VD: Buổi sáng 15/09/2025"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Thời gian */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            <Calendar className="inline mr-1" size={14} /> Thời gian diễn ra
          </label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Địa điểm */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            <MapPin className="inline mr-1" size={14} /> Địa điểm
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Nhập địa điểm..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Tiến độ */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Tiến độ (%)
          </label>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            min={0}
            max={100}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-5 py-2 rounded-full text-sm shadow-sm transition"
          >
            <Save size={16} />{" "}
            {existingSession ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionFormPage;
