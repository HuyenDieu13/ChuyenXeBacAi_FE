import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { demoCampaigns, Campaign } from "./campaignData";
import { Calendar, MapPin, DollarSign, Upload, Save, XCircle } from "lucide-react";

const CampaignFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();

  const existingCampaign = id
    ? demoCampaigns.find((c) => c.id === id)
    : undefined;

  const [form, setForm] = useState<Campaign>(
    existingCampaign || {
      id: "",
      name: "",
      startDate: "",
      endDate: "",
      location: "",
      status: "UPCOMING",
      targetFund: 0,
      banner: "",
    }
  );

  const [preview, setPreview] = useState<string | null>(
    existingCampaign?.banner || null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "targetFund"
          ? Number(value)
          : (value as string | Campaign["status"]),
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

    if (!form.name || !form.startDate || !form.endDate || !form.location) {
      alert("Vui lòng nhập đầy đủ thông tin chiến dịch.");
      return;
    }

    if (existingCampaign) {
      alert("✅ Cập nhật chiến dịch thành công!");
    } else {
      alert("✅ Tạo chiến dịch mới thành công!");
    }

    navigate({ to: "/admin/campaigns" });
  };

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          {existingCampaign ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch mới"}
        </h1>
        <button
          onClick={() => navigate({ to: "/admin/campaigns" })}
          className="flex items-center gap-2 text-gray-500 hover:text-[#355C7D] transition"
        >
          <XCircle size={18} /> Quay lại
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 max-w-3xl mx-auto"
      >
        {/* Upload banner */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Banner chiến dịch
          </label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex justify-center items-center overflow-hidden border border-gray-200">
              {preview ? (
                <img
                  src={preview}
                  alt="Banner Preview"
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

        {/* Tên chiến dịch */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Tên chiến dịch
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nhập tên chiến dịch..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Thời gian */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              <Calendar className="inline mr-1" size={14} />
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              <Calendar className="inline mr-1" size={14} />
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            />
          </div>
        </div>

        {/* Địa điểm */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            <MapPin className="inline mr-1" size={14} />
            Địa điểm
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Nhập địa điểm diễn ra..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
          />
        </div>

        {/* Trạng thái + Quỹ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Tình trạng
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            >
              <option value="UPCOMING">Sắp diễn ra</option>
              <option value="ONGOING">Đang diễn ra</option>
              <option value="ENDED">Đã kết thúc</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              <DollarSign className="inline mr-1" size={14} />
              Quỹ mục tiêu (VNĐ)
            </label>
            <input
              type="number"
              name="targetFund"
              value={form.targetFund}
              onChange={handleChange}
              placeholder="Nhập số tiền mục tiêu..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#355C7D] text-sm"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/campaigns" })}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-5 py-2 rounded-full text-sm shadow-sm transition"
          >
            <Save size={16} /> {existingCampaign ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignFormPage;