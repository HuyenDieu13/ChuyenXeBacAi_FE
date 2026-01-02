import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save } from "lucide-react";

import { adminCampaignDetailRoute } from "@/routes/admin";
import {
  CreateSessionRequest,
  UpdateSessionRequest,
} from "@/types/session.type";
import { SessionStatus } from "@/enum/status.enum";
import {
  useSessionById,
  useCreateSession,
  useUpdateSession,
} from "@/hooks/session.hook";
import { SessionResource } from "@/types/session.type";

const isNumericSessionStatus =
  typeof SessionStatus.UPCOMING === "number";

const SessionFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { id: campaignId } = useParams({
    from: adminCampaignDetailRoute.id,
  });
  const { sessionId } = useParams({ strict: false });
  const isEdit = Boolean(sessionId);

  const { data: session, isLoading } = useSessionById(sessionId);
  const { mutate: createSession, isPending: isCreating } =
    useCreateSession();
  const { mutate: updateSession, isPending: isUpdating } =
    useUpdateSession(campaignId);

  const [form, setForm] = useState<SessionResource>(  {
    id: "",
    title: "",
    session_date: "",
    quota: 0,
    status: SessionStatus.UPCOMING,
    place_name: "",
    lat: 0,
    lng: 0,
    geo_radius_m: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ================= FILL EDIT ================= */
  useEffect(() => {
    if (isEdit && session) {
      const toLocalInput = (s?: string) => {
        if (!s) return "";
        const d = new Date(s);
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
          d.getDate()
        )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      };
      setForm({
        ...session
      });
    }
  }, [isEdit, session]);

  /* ================= VALIDATE ================= */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.title?.trim()) e.title = "Vui lòng nhập tên buổi";
    if (!form.session_date) e.session_date = "Vui lòng chọn ngày & giờ";
    if (!form.place_name?.trim())
      e.place_name = "Vui lòng nhập địa điểm";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= HANDLERS ================= */
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "quota" ||
      name === "lat" ||
      name === "lng" ||
      name === "geoRadiusM"
        ? Number(value)
        : name === "status"
        ? (isNumericSessionStatus ? (Number(value) as any) : (value as any))
        : value,
  }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit && sessionId) {
      const payload: UpdateSessionRequest = {
        title: form.title,
        sessionDate: form.session_date,
        quota: form.quota,
        status: form.status,
        placeName: form.place_name,
        lat: form.lat,
        lng: form.lng,
        geoRadiusM: form.geo_radius_m,
      };
      updateSession({ id: sessionId, data: payload });
    } else {
      const payload: CreateSessionRequest = {
        campaignId: campaignId!,
        title: form.title,
        sessionDate: form.session_date,
        quota: form.quota,
        status: form.status,       
        placeName: form.place_name,
        lat: form.lat,
        lng: form.lng,
        geoRadiusM: form.geo_radius_m,
      };
      createSession(payload);
    }
  };

  /* ================= LOADING ================= */
  if (isEdit && isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-500">
        Đang tải buổi hoạt động...
      </div>
    );
  }

  const isSubmitting = isCreating || isUpdating;

  /* ================= UI ================= */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm space-y-6 max-w-3xl"
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 border-b pb-3">
        <button
          type="button"
          onClick={() =>
            navigate({
              to: `/admin/campaigns/${campaignId}/sessions`,
            })
          }
          className="w-9 h-9 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-[#355C7D]">
          {isEdit ? "Chỉnh sửa buổi hoạt động" : "Thêm buổi hoạt động"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* TITLE */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">
            Tên buổi hoạt động
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="VD: Dọn rác bờ biển"
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm font-semibold">
            Thời gian diễn ra
          </label>
          <input
            type="datetime-local"
            name="session_date"
            value={form.session_date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
          {errors.session_date && (
            <p className="text-red-500 text-xs mt-1">
              {errors.session_date}
            </p>
          )}
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm font-semibold">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          >
            <option value={SessionStatus.UPCOMING}>
              Sắp diễn ra
            </option>
            <option value={SessionStatus.ONGOING}>
              Đang diễn ra
            </option>
            <option value={SessionStatus.DONE}>
              Đã kết thúc
            </option>
          </select>
        </div>

        {/* place_name */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Địa điểm</label>
          <input
            name="place_name"
            value={form.place_name}
            onChange={handleChange}
            placeholder="VD: Công viên Gia Định"
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
          {errors.place_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.place_name}
            </p>
          )}
        </div>

        {/* QUOTA */}
        <div>
          <label className="text-sm font-semibold">
            Số lượng TNV
          </label>
          <input
            type="number"
            min={0}
            name="quota"
            value={form.quota}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
        </div>
      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={() =>
            navigate({
              to: `/admin/campaigns/${campaignId}/sessions`,
            })
          }
          className="px-4 py-2 border rounded-full"
        >
          Hủy
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-full flex items-center gap-2 text-white
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#355C7D] hover:bg-[#2c4b66]"
            }`}
        >
          {isSubmitting && (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          )}
          <Save size={16} />
          {isEdit
            ? isUpdating
              ? "Đang lưu..."
              : "Lưu thay đổi"
            : isCreating
            ? "Đang tạo..."
            : "Tạo buổi"}
        </button>
      </div>
    </form>
  );
};

export default SessionFormPage;
