import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { SessionResource, SessionStatus } from "@/types/session.type";
import { demoSessions } from "./sessionData";
import { Calendar, MapPin, Upload, Save, ArrowLeft } from "lucide-react";
import { adminCampaignDetailRoute } from "@/routes/admin";
const SessionFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
  const { sessionId } = useParams({ strict: false });
  const isEditMode = Boolean(sessionId);  
  const existingSession = isEditMode
    ? demoSessions.find((s) => s.id === sessionId && s.campaignId === campaignId)
    : undefined;

  // -------------------
  // FORM STATE
  // -------------------
  const [form, setForm] = useState<SessionResource>(
    existingSession || {
      id: "",
      campaignId: campaignId,
      title: "",
      description: "",
      sessionDate: "",
      shift: "morning",
      location: "",
      quota: 0,
      lat: 0,
      lng: 0,
      banner: "",
      volunteers: [],
      status: SessionStatus.UPCOMING,
      progress: 0, // sẽ auto tính, form chỉ hiển thị
    }
  );

  const [preview, setPreview] = useState<string | null>(
    existingSession?.banner || null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quota" || name === "lat" || name === "lng"
        ? Number(value)
        : value,
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
    alert(existingSession ? "Cập nhật thành công!" : "Tạo mới thành công!");
    navigate({ to: `/admin/campaigns/${campaignId}/sessions` });
  };

  const handleBack = () =>
    navigate({ to: `/admin/campaigns/${campaignId}/sessions` });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-6 w-full"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-[#355C7D]">
              {existingSession ? "Chi tiết buổi hoạt động" : "Thêm buổi hoạt động"}
            </h1>
          </div>
        </div>

        {/* BANNER */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Banner buổi hoạt động
          </label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <Upload size={32} className="text-gray-400" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Tên buổi
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="VD: Buổi sáng 15/09/2025"
            className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả chi tiết về nội dung hoạt động..."
            className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
          />
        </div>

        {/* TIME */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            <Calendar className="inline mr-1" size={14} /> Thời gian diễn ra
          </label>
          <input
            type="datetime-local"
            name="sessionDate"
            value={form.sessionDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
          />
        </div>

        {/* SHIFT + LOCATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* SHIFT */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Ca hoạt động
            </label>
            <select
              name="shift"
              value={form.shift}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
            >
              <option value="morning">Buổi sáng</option>
              <option value="afternoon">Buổi chiều</option>
              <option value="evening">Buổi tối</option>
              <option value="custom">Khác</option>
            </select>
          </div>

          {/* LOCATION */}
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
              className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
            />
          </div>
        </div>

        {/* QUOTA */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Số lượng TNV tối đa
          </label>
          <input
            type="number"
            name="quota"
            value={form.quota}
            onChange={handleChange}
            min={1}
            className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
          />
        </div>

        {/* LAT + LNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Latitude</label>
            <input
              type="number"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Longitude</label>
            <input
              type="number"
              name="lng"
              value={form.lng}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
            />
          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-semibold mb-2">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:border-[#355C7D]"
          >
            <option value={SessionStatus.UPCOMING}>Sắp diễn ra</option>
            <option value={SessionStatus.ONGOING}>Đang diễn ra</option>
            <option value={SessionStatus.ENDED}>Đã kết thúc</option>
          </select>
        </div>

        {/* VOLUNTEERS (readonly) */}
        {existingSession && (
          <div>
            <label className="block text-sm font-semibold mb-2">
              Tình nguyện viên ({form.volunteers.length})
            </label>
            <div className="p-3 border rounded-lg bg-gray-50 text-gray-700">
              {form.volunteers.length === 0
                ? "Chưa có TNV tham gia"
                : form.volunteers.join(", ")}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border rounded-full text-gray-600 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-6 py-2 rounded-full"
          >
            <Save size={16} />
            {existingSession ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionFormPage;
