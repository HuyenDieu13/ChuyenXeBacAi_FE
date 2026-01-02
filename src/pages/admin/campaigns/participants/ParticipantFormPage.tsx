import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, User, Calendar, FileText } from "lucide-react";

import {
  adminCampaignDetailRoute,
  adminParticipantsRoute,
} from "@/routes/admin";

import { useUsers } from "@/hooks/user.hook";
import { useSessionsByCampaign } from "@/hooks/session.hook";
import { useApplyVolunteerRegistration } from "@/hooks/volunteer-application.hook";
import { CreateVolunteerRegistrationRequest } from "@/types/volunteer-registration.type";
const ParticipantFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { id: campaignId } = useParams({
    from: adminCampaignDetailRoute.id,
  });

  /* ================= API ================= */
  const [userSearch, setUserSearch] = useState("");

  const { data: usersRes, isLoading: usersLoading } = useUsers({
    q: userSearch,
  });

  const users = usersRes?.data ?? [];

  const { data: sessionsRes } = useSessionsByCampaign(campaignId);
  const sessions = sessionsRes ?? [];

  const applyMutation = useApplyVolunteerRegistration();

  const [form, setForm] = useState<CreateVolunteerRegistrationRequest>({
    userId: "",
    campaignId: "",
    sessionId: "",
    applyReason: "",
  });
  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.userId || !form.sessionId || !form.applyReason) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    applyMutation.mutate(
      {
        userId: form.userId || "",
        campaignId: campaignId || "",
        sessionId: form.sessionId,
        applyReason: form.applyReason,
      },
      {
        onSuccess: () => {
          alert("Đăng ký thành công");
          navigate({
            to: adminParticipantsRoute.id,
            params: { id: campaignId },
          });
        },
      }
    );
  };

  const handleBack = () =>
    navigate({
      to: adminParticipantsRoute.id,
      params: { id: campaignId },
    });

  /* ================= RENDER ================= */
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-8 w-full max-w-3xl"
      >
        {/* HEADER */}
        <div className="flex items-center gap-4 border-b pb-6">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#355C7D]">
            Đăng ký người tham gia
          </h1>
        </div>

        {/* USER SELECT */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            <User size={16} className="inline mr-1" />
            Người tham gia *
          </label>

          <input
            placeholder="Tìm theo tên hoặc email..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-2"
          />

          <select
            name="userId"
            required
            value={form.userId}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">-- Chọn người --</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.fullName} – {u.email}
              </option>
            ))}
          </select>

          {usersLoading && (
            <p className="text-xs text-gray-400 mt-1">
              Đang tải danh sách người dùng...
            </p>
          )}
        </div>

        {/* SESSION SELECT */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            <Calendar size={16} className="inline mr-1" />
            Buổi tình nguyện *
          </label>

          <select
  name="sessionId"
  required
  value={form.sessionId}
  onChange={handleChange}
  className="w-full px-4 py-3 border rounded-lg"
>
  <option value="">-- Chọn buổi --</option>
  {sessions.map((s: any) => (
    <option key={s.id} value={s.id}>
      {s.title} –{" "}
      {new Date(s.sessionDate).toLocaleDateString("vi-VN")}
    </option>
  ))}
</select>

        </div>

        {/* APPLY REASON */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            <FileText size={16} className="inline mr-1" />
            Lý do đăng ký *
          </label>
          <textarea
            name="applyReason"
            required
            rows={3}
            value={form.applyReason}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-3 border rounded-full"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-3 px-8 py-3 bg-[#355C7D] text-white rounded-full"
          >
            <Save size={20} />
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantFormPage;
