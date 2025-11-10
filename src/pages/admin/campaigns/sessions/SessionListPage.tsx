import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoSessions, Session } from "./sessionData";

const SessionListPage: React.FC = () => {
  // ✅ Route path: /admin/campaigns/$id/sessions
  const { id: campaignId } = useParams({ from: "/admin/campaigns/$id/sessions" });
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Session[]>(demoSessions);

  const handleBack = () => navigate({ to: `/admin/campaigns` });
  const handleAdd = () =>
    navigate({ to: `/admin/campaigns/${campaignId}/sessions/form` });
  const handleEdit = (sid: string) =>
    navigate({ to: `/admin/campaigns/${campaignId}/sessions/form/${sid}` });

  const handleDelete = (sid: string) => {
    if (confirm("Xác nhận xóa buổi hoạt động này?")) {
      setSessions(sessions.filter((s) => s.id !== sid));
    }
  };

  const columns: Column<Session>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },
    {
      key: "name",
      title: "Tên buổi",
      render: (s) => (
        <div className="font-medium text-[#355C7D]">{s.name}</div>
      ),
    },
    {
      key: "date",
      title: "Thời gian",
      render: (s) => (
        <span className="flex items-center gap-1 text-gray-700">
          <Calendar size={14} /> {s.date}
        </span>
      ),
    },
    {
      key: "location",
      title: "Địa điểm",
      render: (s) => (
        <span className="flex items-center gap-1 text-gray-700">
          <MapPin size={14} /> {s.location}
        </span>
      ),
    },
    {
      key: "volunteers",
      title: "Số TNV",
      align: "center",
      render: (s) => (
        <span className="flex justify-center items-center gap-1 text-gray-700">
          <Users size={14} /> {s.volunteers.length}
        </span>
      ),
    },
    {
      key: "progress",
      title: "Tiến độ",
      align: "center",
      render: (s) => (
        <div className="flex justify-center items-center gap-1 text-green-600 font-semibold">
          <CheckCircle size={14} /> {s.progress}%
        </div>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (s) => (
        <div className="flex justify-center gap-2 text-gray-500">
          <button
            className="hover:text-[#355C7D]"
            title="Chỉnh sửa buổi"
            onClick={() => handleEdit(s.id)}
          >
            <Edit size={18} />
          </button>
          <button
            className="hover:text-red-500"
            title="Xóa buổi"
            onClick={() => handleDelete(s.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-600 transition"
            title="Quay lại danh sách chiến dịch"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[22px] font-bold text-[#355C7D]">
            Các buổi hoạt động
          </h1>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} /> Thêm buổi
        </button>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={sessions} />
    </div>
  );
};

export default SessionListPage;
