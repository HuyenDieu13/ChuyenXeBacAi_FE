import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoSessions } from "./sessionData";
import { SessionResource, SessionStatus } from "@/types/session.type";
import { addAdminSessionFormRoute, editAdminSessionFormRoute } from "@/routes/admin";
interface SessionListPageProps {
  campaignId: string;
}
const SessionListPage: React.FC<SessionListPageProps> = ({ campaignId }) => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<SessionResource[]>(
    demoSessions.filter((s) => s.campaignId === campaignId)
  );
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | SessionStatus>("ALL");

  const filteredSessions = sessions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === "ALL" || s.status === filterStatus)
  );


  const handleAdd = () =>
    navigate({ to: addAdminSessionFormRoute.to });

  const handleEdit = (sid: string) =>
    navigate({ to: editAdminSessionFormRoute.to, params: { id: campaignId, sessionId: sid } });



  const handleDelete = (sid: string) => {
    if (confirm("Xác nhận xóa buổi hoạt động này?")) {
      setSessions(sessions.filter((s) => s.id !== sid));
    }
  };

  // -----------------------
  // TABLE COLUMNS
  // -----------------------
  const columns: Column<SessionResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "title",
      title: "Tên buổi",
      render: (s) => (
        <div className="font-medium text-[#355C7D]">
          {s.title}
        </div>
      ),
    },

    {
      key: "sessionDate",
      title: "Thời gian",
      render: (s) => (
        <span className="flex items-center gap-1 text-gray-700">
          <Calendar size={14} />
          {new Date(s.sessionDate).toLocaleString("vi-VN")}
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
      key: "quota",
      title: "TNV",
      align: "center",
      render: (s) => (
        <span className="text-gray-700">
          {s.volunteers.length} / {s.quota}
        </span>
      ),
    },

    {
      key: "shift",
      title: "Ca",
      align: "center",
      render: (s) => (
        <span className="text-gray-700">
          {s.shift === "morning"
            ? "Sáng"
            : s.shift === "afternoon"
              ? "Chiều"
              : "Khác"}
        </span>
      ),
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (s) => {
        switch (s.status) {
          case SessionStatus.ONGOING:
            return (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                Đang diễn ra
              </span>
            );
          case SessionStatus.UPCOMING:
            return (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                Sắp diễn ra
              </span>
            );
          default:
            return (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                Đã kết thúc
              </span>
            );
        }
      },
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
          {/* Chỉnh sửa */}
          <button
            className="hover:text-yellow-600"
            title="Chỉnh sửa buổi"
            onClick={() => handleEdit(s.id)}
          >
            <Edit size={18} />
          </button>

          {/* Xoá */}
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">

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
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm buổi hoạt động..." className="flex-1 outline-none text-sm text-gray-700" />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)} className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]">
            <option value="ALL">Tất cả</option>
            <option value={SessionStatus.UPCOMING}>Sắp diễn ra</option>
            <option value={SessionStatus.ONGOING}>Đang diễn ra</option>
            <option value={SessionStatus.ENDED}>Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={filteredSessions} />
    </div>
  );
};

export default SessionListPage;
