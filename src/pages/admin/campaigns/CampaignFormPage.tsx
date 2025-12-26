// src/pages/admin/campaigns/CampaignFormPage.tsx
import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  DollarSign,
  Save,
  ArrowLeft,
  X,
  Plus,
} from "lucide-react";
import { CampaignResource, CreateCampaignRequest, UpdateCampaignRequest } from "@/types/campaign.type";
import { CampaignStatus } from "@/enum/status.enum";
import { useCampaignById, useCreateCampaign, useUpdateCampaign } from "@/hooks/campaign.hook";

const CampaignFormPage: React.FC = () => {
  const { params } = useParams({ strict: false });
  const id = params.id;
  const isEditMode = !!id;
  const { mutate: createCamapign, isPending: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } = useUpdateCampaign();
  const { data: campaignData } = useCampaignById(id);
  const navigate = useNavigate();
  const router = useRouter();
  // Form state
  const [formData, setFormData] = useState<CampaignResource>({
    id: '',
    title: '',
    location: '',
    description: '',
    goal_amount: 0,
    collected_amount: 0,
    status: CampaignStatus.DRAFT,
    cover_url: '',
    startDate: '',
    endDate: ''
  });
  useEffect(() => {
    if (isEditMode && campaignData) {
      setFormData(campaignData);
    }
  }, [isEditMode, campaignData]);
  // const [previews, setPreviews] = useState<string[]>(
  //   isEditMode?.banners || []
  // );

  // ============================
  // HANDLERS
  // ============================
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   const newPreviews: string[] = [];
  //   Array.from(files).forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (ev) => {
  //       const result = ev.target?.result as string;
  //       newPreviews.push(result);

  //       if (newPreviews.length === files.length) {
  //         setPreviews((prev) => [...prev, ...newPreviews]);
  //         setForm((prev) => ({
  //           ...prev,
  //           banners: [...(prev.banners || []), ...newPreviews],
  //         }));
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const removeImage = (index: number) => {
  //   setPreviews((prev) => prev.filter((_, i) => i !== index));
  //   setForm((prev) => ({
  //     ...prev,
  //     banners: (prev.banners || []).filter((_, i) => i !== index),
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateCampaignRequest | UpdateCampaignRequest = {
      title: formData.title,
      description: formData.description || '',
      location: formData.location || '',
      goalAmount: formData.goal_amount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      coverUrl: formData.cover_url,
      status: formData.status,
    };
    if (isEditMode) {
      updateCampaign({ id: id, data: payload });
    } else {
      createCamapign(payload);
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
          {isEditMode ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch mới"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-8"
      >
        {/* IMAGE UPLOAD */}
        {/* <div>
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
            ))} */}

        {/* UPLOAD BOX */}
        {/* <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#355C7D] transition">
              <Plus size={28} className="text-gray-400" />
              <span className="mt-1 text-xs text-gray-600">Thêm ảnh</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-gray-500">
            Tối đa 10 ảnh, định dạng JPG/PNG
          </p>
        </div> */}

        {/* FORM INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tiêu đề *
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#355C7D] text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="description"
              value={formData.description}
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
              value={formData.startDate}
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
              value={formData.endDate}
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
              value={formData.location}
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
              value={formData.goal_amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status}
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
            {isEditMode ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignFormPage;
