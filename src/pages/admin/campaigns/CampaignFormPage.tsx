// src/pages/admin/campaigns/CampaignFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import { Calendar, MapPin, DollarSign, Save, ArrowLeft, X, Plus } from "lucide-react";
import { demoCampaigns } from "./campaignData";
import { CampaignResource, CampaignStatus } from "@/types/campaign.type";

const CampaignFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const router = useRouter();

  const existingCampaign = id ? demoCampaigns.find((c) => c.id === id) : undefined;

  const [form, setForm] = useState<CampaignResource>(
    existingCampaign || {
      id: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      goalAmount: 0,
      collectedAmount: 0,
      goalVolunteers: 0,
      registeredVolunteers: 0,
      status: CampaignStatus.PUBLISHED,
      createdAt: new Date().toISOString(),
      banners: [],
    }
  );

  const [previews, setPreviews] = useState<string[]>(existingCampaign?.banners || []);

  // ============================
  // HANDLERS
  // ============================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "goalAmount" || name === "goalVolunteers" ? Number(value) : value,
    }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        newPreviews.push(result);

        if (newPreviews.length === files.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
          setForm((prev) => ({ ...prev, banners: [...(prev.banners || []), ...newPreviews] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({ ...prev, banners: (prev.banners || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.startDate || !form.endDate || (form.banners?.length || 0) === 0) {
      alert("Vui lòng nhập đầy đủ thông tin và thêm ít nhất 1 ảnh!");
      return;
    }

    if (existingCampaign) {
      const index = demoCampaigns.findIndex((c) => c.id === id);
      if (index !== -1) {
        demoCampaigns[index] = { ...form, updatedAt: new Date().toISOString() };
      }
      alert("Cập nhật chiến dịch thành công!");
    } else {
      const newCampaign = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        collectedAmount: 0,
        registeredVolunteers: 0,
      };
      demoCampaigns.push(newCampaign);
      alert("Tạo chiến dịch mới thành công!");
    }

    navigate({ to: "/admin/campaigns" });
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex gap-2 items-center mb-6">
        <button
          onClick={() => navigate({ to: "/admin/campaigns" })}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          {existingCampaign ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch mới"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-8">

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bộ sưu tập ảnh chiến dịch
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* UPLOAD BOX */}
            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#355C7D] transition">
              <Plus size={28} className="text-gray-400" />
              <span className="mt-1 text-xs text-gray-600">Thêm ảnh</span>
              <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>

          <p className="text-xs text-gray-500">Tối đa 10 ảnh, định dạng JPG/PNG</p>
        </div>

        {/* FORM INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Tiêu đề *</label>
            <input
              required
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#355C7D] text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả ngắn</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#355C7D] text-sm"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Calendar size={16} /> Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Calendar size={16} /> Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <MapPin size={16} /> Địa điểm
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <DollarSign size={16} /> Quỹ mục tiêu (VNĐ)
            </label>
            <input
              type="number"
              name="goalAmount"
              value={form.goalAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-1">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value={CampaignStatus.DRAFT}>Nháp</option>
              <option value={CampaignStatus.PUBLISHED}>Đã công khai</option>
              <option value={CampaignStatus.ONGOING}>Đang diễn ra</option>
              <option value={CampaignStatus.COMPLETED}>Hoàn thành</option>
              <option value={CampaignStatus.CANCELLED}>Đã hủy</option>
            </select>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.history.back()}
            className="px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-[#355C7D] text-white rounded-full text-sm hover:bg-[#26415D] transition"
          >
            <Save size={16} />
            {existingCampaign ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignFormPage;
