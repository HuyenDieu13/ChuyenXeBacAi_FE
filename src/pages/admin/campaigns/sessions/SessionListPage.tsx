import React, { useState, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { SessionResource, SessionStatus } from "@/types/session.type";
import {
  addAdminSessionFormRoute,
  editAdminSessionFormRoute,
} from "@/routes/admin";
import { sessionService } from "@/services/session.service";

interface SessionListPageProps {
  campaignId: string;
}

const SessionListPage: React.FC<SessionListPageProps> = ({ campaignId }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | SessionStatus>("ALL");

  /* ================= API ================= */
  const { data, isLoading } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: () =>
      sessionService.getSessionsByCampaignId(campaignId),
    enabled: !!campaignId,
  });

  // Normalize different possible response shapes into an array of sessions
  const sessions: SessionResource[] = (() => {
    if (!data) return [];
    // data may already be an array
    if (Array.isArray(data)) return data as SessionResource[];
    // common server response shapes: { items: [...] }, { data: [...] }, { sessions: [...] }
    if ((data as any).items && Array.isArray((data as any).items))
      return (data as any).items as SessionResource[];
    if ((data as any).data && Array.isArray((data as any).data))
      return (data as any).data as SessionResource[];
    if ((data as any).sessions && Array.isArray((data as any).sessions))
      return (data as any).sessions as SessionResource[];
    // fallback: try to treat data as a single session object
    if ((data as any).id) return [data as unknown as SessionResource];
    return [];
  })();

  /* ================= FILTER ================= */
  const filteredSessions = useMemo(() => {
    return sessions.filter(
      (s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "ALL" || s.status === filterStatus)
    );
  }, [sessions, search, filterStatus]);

  /* ================= HANDLERS ================= */
  const handleAdd = () =>
    navigate({ to: addAdminSessionFormRoute.to });

  const handleEdit = (sid: string) =>
    navigate({
      to: editAdminSessionFormRoute.to,
      params: { id: campaignId, sessionId: sid },
    });

  const handleDelete = (sid: string) => {
    if (confirm("Xác nhận xóa buổi hoạt động này?")) {
      // TODO: gọi API deleteSession
      alert("Chưa gắn API xoá (backend)");
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<SessionResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "title",
      title: "Tên buổi",
      render: (s) => (
        <div className="font-medium text-[#355C7D]">{s.title}</div>
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
          {s.volunteers?.length || 0} / {s.quota}
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
          <CheckCircle size={14} /> {s.progress ?? 0}%
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
            className="hover:text-yellow-600"
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

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Các buổi hoạt động
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} /> Thêm buổi
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm buổi hoạt động..."
            className="flex-1 outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as any)
            }
            className="border rounded-full px-3 py-2 text-sm"
          >
            <option value="ALL">Tất cả</option>
            <option value={SessionStatus.UPCOMING}>Sắp diễn ra</option>
            <option value={SessionStatus.ONGOING}>Đang diễn ra</option>
            <option value={SessionStatus.ENDED}>Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent
        columns={columns}
        data={filteredSessions}
        loading={isLoading}
      />
    </div>
  );
};

export default SessionListPage;
