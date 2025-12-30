import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Upload,
  Save,
  ArrowLeft,
  Search,
} from "lucide-react";

import { adminCampaignDetailRoute } from "@/routes/admin";
import TableComponent, { Column } from "@/components/TableAdminComponent";

import {
  SessionResource,
  SessionStatus,
  CreateSessionRequest,
  UpdateSessionRequest,
  SessionRosterItem,
} from "@/types/session.type";

import { useSessionRoster } from "@/hooks/useSessionRoster";
import { sessionService } from "@/services/session.service";

const SessionFormPage: React.FC = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
  const { sessionId } = useParams({ strict: false });
  const isEditMode = Boolean(sessionId);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState<SessionResource>({
    id: "",
    campaignId,
    title: "",
    description: "",
    sessionDate: "",
    shift: "morning",
    location: "",
    quota: 0,
    lat: 0,
    lng: 0,
    volunteers: [],
    status: SessionStatus.UPCOMING,
    progress: 0,
  });

  const [preview, setPreview] = useState<string | null>(null);

  /* ================= ROSTER ================= */
  const [searchMember, setSearchMember] = useState("");
  const [page, setPage] = useState(1);

  const { data: rosterData, isLoading: loadingRoster } =
    useSessionRoster(sessionId!, {
      page,
      pageSize: 10,
      q: searchMember,
    });

  /* ================= MUTATIONS ================= */
  const createMutation = useMutation({
    mutationFn: sessionService.createSession,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions", campaignId] });
      navigate({ to: `/admin/campaigns/${campaignId}/sessions` });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionRequest }) =>
      sessionService.updateSession(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions", campaignId] });
      navigate({ to: `/admin/campaigns/${campaignId}/sessions` });
    },
  });

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quota" || name === "lat" || name === "lng"
          ? Number(value)
          : value,
    }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      const payload: UpdateSessionRequest = {
        Title: form.title,
        SessionDate: form.sessionDate,
        Shift: form.shift,
        Quota: form.quota,
        Status: form.status,
        PlaceName: form.location,
        Lat: form.lat,
        Lng: form.lng,
      };
      updateMutation.mutate({ id: sessionId!, data: payload });
    } else {
      const payload: CreateSessionRequest = {
        CampaignId: campaignId,
        Title: form.title,
        SessionDate: form.sessionDate,
        Shift: form.shift,
        Quota: form.quota,
        Status: form.status,
        PlaceName: form.location,
        Lat: form.lat,
        Lng: form.lng,
      };
      createMutation.mutate(payload);
    }
  };

  const handleBack = () =>
    navigate({ to: `/admin/campaigns/${campaignId}/sessions` });

  /* ================= ROSTER TABLE ================= */
  const rosterColumns: Column<SessionRosterItem>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },
    {
      key: "fullName",
      title: "Họ tên",
      render: (r) => <span className="font-medium">{r.fullName ?? "-"}</span>,
    },
    {
      key: "phone",
      title: "SĐT",
      render: (r) => r.phone ?? "-",
    },
    {
      key: "role",
      title: "Vai trò",
      align: "center",
      render: (r) => r.role ?? "Chưa phân",
    },
  ];

  return (
    <div className="w-full space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm space-y-6"
      >
        {/* HEADER */}
        <div className="flex items-center gap-2 border-b pb-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#355C7D]">
            {isEditMode ? "Chi tiết buổi hoạt động" : "Thêm buổi hoạt động"}
          </h1>
        </div>

        {/* BANNER */}
        <div>
          <label className="text-sm font-semibold">Banner</label>
          <div className="flex gap-4 mt-2">
            <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <Upload className="text-gray-400" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>
        </div>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tên buổi hoạt động"
          className="w-full border px-3 py-2 rounded-lg"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Mô tả..."
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="datetime-local"
          name="sessionDate"
          value={form.sessionDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border rounded-full"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#355C7D] text-white px-6 py-2 rounded-full"
          >
            <Save size={16} />
            {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      </form>

      {/* MEMBERS */}
      {isEditMode && (
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#355C7D]">
            Thành viên tham gia ({rosterData?.total ?? 0})
          </h2>

          <div className="flex items-center bg-white rounded-full px-4 py-2 border w-1/2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              value={searchMember}
              onChange={(e) => {
                setSearchMember(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm thành viên..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          <TableComponent
            columns={rosterColumns}
            data={rosterData?.items || []}
            loading={loadingRoster}
          />
        </div>
      )}
    </div>
  );
};

export default SessionFormPage;
