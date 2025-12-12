// src/pages/admin/campaigns/participants/ParticipantFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, User, Mail, Phone, Edit3, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { adminCampaignDetailRoute } from "@/routes/admin";
import { demoParticipants } from "./participantData";
import { ParticipantResource, ParticipantRole, RegistrationStatus } from "@/types/participant.type";
import { adminParticipantsRoute } from "@/routes/admin";
const ParticipantFormPage: React.FC = () => {
  const navigate = useNavigate();

  // Lấy campaignId và participantId
  const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
  const { participantId } = useParams({ strict: false });

  const isEditMode = Boolean(participantId);
  const existingParticipant = isEditMode
    ? demoParticipants.find((p) => p.id === participantId && p.campaignId === campaignId)
    : null;

  const [form, setForm] = useState<ParticipantResource>(
    existingParticipant || {
      id: "",
      campaignId,
      fullName: "",
      email: "",
      phone: "",
      avatar: "",
      role: ParticipantRole.VOLUNTEER,
      joinedAt: new Date().toISOString(),
      totalSessions: 0,
      approvedSessions: 0,
      attendedSessions: 0,
      points: 0,
      registrations: [],
      attendanceHistory: [],
      adminNote: "",
    }
  );

  const [preview, setPreview] = useState<string | null>(existingParticipant?.avatar || null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, role: e.target.value as ParticipantRole }));
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

    if (isEditMode) {
      const index = demoParticipants.findIndex((p) => p.id === participantId);
      if (index !== -1) {
        demoParticipants[index] = { ...form, avatar: preview || form.avatar };
      }
      alert("Cập nhật thành viên thành công!");
    } else {
      const newParticipant = {
        ...form,
        id: Date.now().toString(),
        avatar: preview || "",
        joinedAt: new Date().toISOString(),
      };
      demoParticipants.push(newParticipant);
      alert("Thêm thành viên thành công!");
    }

    navigate({ to: adminParticipantsRoute.id, params: { id: campaignId } });
  };

  const handleBack = () => navigate({ to: adminParticipantsRoute.id, params: { id: campaignId } });

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-8 w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#355C7D]">
                {isEditMode ? "Chi tiết & chỉnh sửa thành viên" : "Thêm thành viên mới"}
              </h1>
              {isEditMode && (
                <p className="text-sm text-gray-500 mt-1">
                  ID: <span className="font-mono">{participantId}</span> • Tham gia từ{" "}
                  {new Date(form.joinedAt).toLocaleDateString("vi-VN")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* AVATAR + THÔNG TIN CƠ BẢN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="inline-block flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Ảnh đại diện</label>

            <div className="w-48 h-48 bg-gray-100 rounded-full overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={80} className="text-gray-400" />
              )}
            </div>
            
          </div>


          {/* Form thông tin */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline mr-1" size={16} /> Họ và tên *
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn An"
                  className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline mr-1" size={16} /> Email *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="an.nguyen@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline mr-1" size={16} /> Số điện thoại *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0901234567"
                  className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Edit3 className="inline mr-1" size={16} /> Vai trò
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleRoleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
                >
                  <option value={ParticipantRole.VOLUNTEER}>Tình nguyện viên</option>
                  <option value={ParticipantRole.COORDINATOR}>Điều phối viên</option>
                  <option value={ParticipantRole.LEADER}>Trưởng nhóm</option>
                </select>
              </div>
            </div>

            {/* Ghi chú admin */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ghi chú nội bộ (Admin)
              </label>
              <textarea
                name="adminNote"
                value={form.adminNote || ""}
                onChange={handleChange}
                rows={3}
                placeholder="Ghi chú riêng cho thành viên này..."
                className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
              />
            </div>
          </div>
        </div>

        {/* THỐNG KÊ */}
        {isEditMode && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border">
            <h3 className="text-xl font-bold text-[#355C7D] mb-6">Thống kê tham gia chiến dịch</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{form.totalSessions}</div>
                <div className="text-sm text-gray-600 mt-1">Buổi đăng ký</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{form.approvedSessions}</div>
                <div className="text-sm text-gray-600 mt-1">Đã duyệt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{form.attendedSessions}</div>
                <div className="text-sm text-gray-600 mt-1">Đã điểm danh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{form.points}</div>
                <div className="text-sm text-gray-600 mt-1">Điểm tích lũy</div>
              </div>
            </div>
          </div>
        )}

        {/* LỊCH SỬ ĐĂNG KÝ BUỔI */}
        {isEditMode && form.registrations.length > 0 && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-bold text-[#355C7D]">Lịch sử đăng ký các buổi</h3>
            </div>
            <div className="divide-y">
              {form.registrations.map((reg) => (
                <div key={reg.sessionId} className="p-6 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-gray-900">{reg.sessionTitle}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <Calendar size={14} className="inline mr-1" />
                      {new Date(reg.sessionDate).toLocaleDateString("vi-VN")}
                      {" • Đăng ký: "}
                      {new Date(reg.appliedAt).toLocaleDateString("vi-VN")}
                    </div>
                    {reg.rejectedReason && (
                      <div className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <XCircle size={14} /> {reg.rejectedReason}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-xs font-medium ${reg.status === RegistrationStatus.APPROVED
                        ? "bg-green-100 text-green-700"
                        : reg.status === RegistrationStatus.PENDING
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {reg.status === RegistrationStatus.PENDING && "Chờ duyệt"}
                      {reg.status === RegistrationStatus.APPROVED && "Đã duyệt"}
                      {reg.status === RegistrationStatus.REJECTED && "Bị từ chối"}
                      {reg.status === RegistrationStatus.CANCELLED && "Đã hủy"}
                    </span>
                    {reg.attended !== undefined && (
                      <div className="mt-2 text-sm">
                        {reg.attended ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={16} /> Đã điểm danh
                          </span>
                        ) : (
                          <span className="text-gray-500">Chưa điểm danh</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LỊCH SỬ ĐIỂM DANH */}
        {isEditMode && form.attendanceHistory.length > 0 && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-bold text-[#355C7D]">Lịch sử điểm danh</h3>
            </div>
            <div className="divide-y">
              {form.attendanceHistory.map((record) => (
                <div key={record.sessionId} className="p-6 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{record.sessionTitle}</div>
                    <div className="text-sm text-gray-600">
                      <Clock size={14} className="inline mr-1" />
                      Điểm danh lúc: {new Date(record.checkInAt).toLocaleString("vi-VN")}
                      {record.note && ` • Ghi chú: ${record.note}`}
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium ${record.status === "present"
                      ? "bg-green-100 text-green-700"
                      : record.status === "late"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {record.status === "present" && "Có mặt"}
                    {record.status === "late" && "Đi muộn"}
                    {record.status === "absent" && "Vắng"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NÚT HÀNH ĐỘNG */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleBack}
            className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-3 px-8 py-3 bg-[#355C7D] hover:bg-[#26415D] text-white rounded-full font-medium transition shadow-sm"
          >
            <Save size={20} />
            {isEditMode ? "Cập nhật thành viên" : "Thêm thành viên"}
          </button>
        </div>
      </form>

    </div>
  );
};

export default ParticipantFormPage;