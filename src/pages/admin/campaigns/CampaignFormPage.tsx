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

const EMPTY_FORM: CampaignResource = {
  id: "",
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
};

const CampaignFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const isEditMode = !!id;

  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: createCampaign, isPending: isCreating } =
    useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } =
    useUpdateCampaign();

  const { data: campaignData, isLoading } = useCampaignById(id);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] =
    useState<CampaignResource>(EMPTY_FORM);

  /* =========================
     FILL DATA (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (isEditMode && campaignData) {
      setFormData({
        ...EMPTY_FORM,
        ...campaignData,
        title: campaignData.title ?? "",
        location: campaignData.location ?? "",
        description: campaignData.description ?? "",
        cover_url: campaignData.cover_url ?? "",
        start_date: campaignData.start_date ?? "",
        end_date: campaignData.end_date ?? "",
      });
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

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "goal_amount"
          ? Number(value)
          : name === "status"
          ? (value as CampaignStatus)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const base = {
      title: formData.title,
      description: formData.description ?? "",
      location: formData.location ?? "",
      goalAmount: formData.goal_amount,
      startDate: formData.start_date,
      endDate: formData.end_date,
      coverUrl: formData.cover_url ?? "",

      // ✅ đỡ lệch type nhất: gửi string
      status: String(formData.status ?? CampaignStatus.PLANNING),
    };

    if (isEditMode && id) {
      updateCampaign({ id, data: base as UpdateCampaignRequest });
    } else {
    }
};


  /* =========================
     LOADING
  ========================= */
  if (isEditMode && isLoading) {
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
          className="w-9 h-9 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          {isEditMode ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch mới"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border p-6 space-y-8"
      >
        {/* COVER */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            Ảnh bìa chiến dịch
          </label>

          <div className="h-56 rounded-xl overflow-hidden border bg-gray-100 mb-3">
            <img
              src={formData.cover_url || PLACEHOLDER_IMAGE}
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  PLACEHOLDER_IMAGE)
              }
            />
          </div>

          <input
            type="text"
            name="cover_url"
            value={formData.cover_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Địa điểm"
            className="px-3 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Mô tả"
            className="md:col-span-2 px-3 py-2 border rounded-lg"
          />

          <input
            value={formatDateVN(formData.start_date)}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                start_date: parseDateVN(e.target.value),
              }))
            }
            placeholder="Ngày bắt đầu"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            value={formatDateVN(formData.end_date)}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                end_date: parseDateVN(e.target.value),
              }))
            }
            placeholder="Ngày kết thúc"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            type="number"
            name="goal_amount"
            value={formData.goal_amount}
            onChange={handleChange}
            placeholder="Quỹ mục tiêu"
            className="px-3 py-2 border rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
          >
            <option value={CampaignStatus.PLANNING}>
              Lên kế hoạch
            </option>
            <option value={CampaignStatus.ONGOING}>
              Đang diễn ra
            </option>
            <option value={CampaignStatus.DONE}>Hoàn thành</option>
            <option value={CampaignStatus.CANCELLED}>
              Đã hủy
            </option>
          </select>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={() => router.history.back()}
            className="px-4 py-2 border rounded-full"
          >
            Hủy
          </button>

          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="px-6 py-2 bg-[#355C7D] text-white rounded-full"
          >
            {isEditMode ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignFormPage;
