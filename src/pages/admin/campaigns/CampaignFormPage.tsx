// src/pages/admin/campaigns/CampaignFormPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import { formatDateVN, parseDateVN } from "@/helpers/date";
import {
  Calendar,
  MapPin,
  DollarSign,
  Save,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";

import {
  CampaignResource,
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from "@/types/campaign.type";
import { CampaignStatus } from "@/enum/status.enum";
import {
  useCampaignById,
  useCreateCampaign,
  useUpdateCampaign,
} from "@/hooks/campaign.hook";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x300?text=Campaign+Cover";

const CampaignFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const isEditMode = !!id;

  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: createCampaign, isPending: isCreating } =
    useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } =
    useUpdateCampaign();

  const { data: campaignData, isLoading: isLoadingCampaign } =
    useCampaignById(id);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState<CampaignResource>({
    id: id ?? "",
    title: "",
    location: "",
    description: "",
    goal_amount: 0,
    collected_amount: 0,
    status: CampaignStatus.PLANNING,
    cover_url: "",
    start_date: "",
    end_date: "",
    media_assets: [],
  });

  useEffect(() => {
    if (isEditMode && campaignData) {
      setFormData(campaignData);
    }
  }, [isEditMode, campaignData]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateCampaignRequest | UpdateCampaignRequest = {
      title: formData.title,
      description: formData.description || "",
      location: formData.location || "",
      goalAmount: formData.goal_amount,
      startDate: formData.start_date,
      endDate: formData.end_date,
      coverUrl: formData.cover_url,
      status: formData.status,
    };

    if (isEditMode && id) {
      updateCampaign({ id, data: payload });
    } else {
      createCampaign(payload);
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (isEditMode && isLoadingCampaign) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-gray-500 animate-pulse">
          Đang tải dữ liệu chiến dịch...
        </div>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="w-full max-w-5xl mx-auto">
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
        {/* =========================
           COVER IMAGE
        ========================= */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Ảnh bìa chiến dịch
          </label>

          <div className="w-full h-56 rounded-xl overflow-hidden border bg-gray-100 mb-3">
            <img
              src={formData.cover_url || PLACEHOLDER_IMAGE}
              alt="Ảnh bìa chiến dịch"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <ImageIcon size={18} className="text-gray-500" />
            <input
              type="text"
              name="cover_url"
              placeholder="Dán URL ảnh bìa (https://...)"
              value={formData.cover_url}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:border-[#355C7D]"
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Gợi ý: dùng URL ảnh đầy đủ (http/https). Ảnh sẽ được xem trước ngay.
          </p>
        </div>

        {/* =========================
           FORM INPUTS
        ========================= */}
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

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:border-[#355C7D] text-sm"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Calendar size={16} /> Ngày bắt đầu
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={formatDateVN(formData.start_date)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  start_date: parseDateVN(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Calendar size={16} /> Ngày kết thúc
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={formatDateVN(formData.end_date)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  end_date: parseDateVN(e.target.value),
                }))
              }
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
              name="goal_amount"
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
              <option value={CampaignStatus.PLANNING}>Lên kế hoạch</option>
              <option value={CampaignStatus.ONGOING}>Đang diễn ra</option>
              <option value={CampaignStatus.DONE}>Hoàn thành</option>
              <option value={CampaignStatus.CANCELLED}>Đã hủy</option>
            </select>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.history.back()}
            className="px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            type="submit"
            disabled={isUpdating || isCreating}
            className="flex items-center gap-2 px-6 py-2 bg-[#355C7D] text-white rounded-full text-sm hover:bg-[#26415D] transition disabled:opacity-50"
          >
            <Save size={16} />
            {isCreating || isUpdating
              ? "...Đang xử lý"
              : isEditMode
              ? "Cập nhật"
              : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignFormPage;
