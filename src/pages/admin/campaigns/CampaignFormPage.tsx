import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import { formatDateVN, parseDateVN } from "@/helpers/date";
import { Save, ArrowLeft } from "lucide-react";

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

const PLACEHOLDER_IMAGE = "https://placehold.co/600x300?text=Campaign+Cover";

const CampaignFormPage: React.FC = () => {
  const { id } = useParams({ strict: false });
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: createCampaign, isPending: isCreating } = useCreateCampaign();
  const { mutate: updateCampaign, isPending: isUpdating } = useUpdateCampaign();

  const { data: campaignData, isLoading } = useCampaignById(id);

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState<CampaignResource>({
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
  });
  /* =========================
     FILL DATA (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (isEditMode && campaignData) {
        setForm({
          ...campaignData,
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

    setForm((prev) => ({
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

    if (!form.title?.trim()) {
      alert("Vui lòng nhập tiêu đề chiến dịch");
      return;
    }

    const basePayload = {
      ...form,
    };

    if (isEditMode && id) {
      updateCampaign({
        id,
        data: basePayload as UpdateCampaignRequest,
      });
    } else {
      createCampaign(basePayload as CreateCampaignRequest);
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
              src={form.cover_url || PLACEHOLDER_IMAGE}
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE)
              }
            />
          </div>

          <input
            type="text"
            name="cover_url"
            value={form.cover_url}
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
            value={form.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Địa điểm"
            className="px-3 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Mô tả"
            className="md:col-span-2 px-3 py-2 border rounded-lg"
          />

          <input
            value={formatDateVN(form.start_date)}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                start_date: parseDateVN(e.target.value),
              }))
            }
            placeholder="Ngày bắt đầu"
            className="px-3 py-2 border rounded-lg"
          />

          <input
            value={formatDateVN(form.end_date)}
            onChange={(e) =>
              setForm((p) => ({
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
            value={form.goal_amount}
            onChange={handleChange}
            placeholder="Quỹ mục tiêu"
            className="px-3 py-2 border rounded-lg"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
          >
            <option value={CampaignStatus.PLANNING}>Lên kế hoạch</option>
            <option value={CampaignStatus.ONGOING}>Đang diễn ra</option>
            <option value={CampaignStatus.DONE}>Hoàn thành</option>
            <option value={CampaignStatus.CANCELLED}>Đã hủy</option>
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
            className="flex items-center gap-2 px-6 py-2 bg-[#355C7D] text-white rounded-full"
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
