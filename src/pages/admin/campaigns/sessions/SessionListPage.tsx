import React, { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Calendar,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import {
  addAdminSessionFormRoute,
  editAdminSessionFormRoute,
} from "@/routes/admin";
import { sessionService } from "@/services/session.service";
import { SessionResource } from "@/types/session.type";
import { SessionStatus } from "@/enum/status.enum";

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
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions", campaignId],
    queryFn: () =>
      sessionService.getSessionsByCampaignId(campaignId),
    enabled: !!campaignId,
  });

  /* ================= FILTER ================= */
  const filteredSessions = useMemo(() => {
    return sessions.filter(
      (s) =>
        s.title?.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "ALL" || s.status === filterStatus)
    );
  }, [sessions, search, filterStatus]);

  /* ================= HANDLERS ================= */
  const handleAdd = () => {
    navigate({
      to: addAdminSessionFormRoute.to,
      params: { id: campaignId },
    });
  };

  const handleEdit = (sid: string) => {
    navigate({
      to: editAdminSessionFormRoute.to,
      params: {
        id: campaignId,
        sessionId: sid,
      },
    });
  };

  const handleDelete = (sid: string) => {
    if (confirm("Xác nhận xóa buổi hoạt động này?")) {
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
        <div className="font-medium text-[#355C7D]">
          {s.title}
        </div>
      ),
    },

    {
      key: "session_date",
      title: "Ngày diễn ra",
      render: (s) => (
        <span className="flex items-center gap-1 text-gray-700">
          <Calendar size={14} />
          {s.session_date
            ? new Date(s.session_date).toLocaleDateString("vi-VN")
            : "--"}
        </span>
      ),
    },

    {
      key: "place_name",
      title: "Địa điểm",
      render: (s) => (
        <span className="flex items-center gap-1 text-gray-700">
          <MapPin size={14} />
          {s.place_name || "Chưa cập nhật"}
        </span>
      ),
    },

    {
      key: "quota",
      title: "TNV",
      align: "center",
      render: (s) => (
        <span className="text-gray-700">
          {s.approved_volunteers ?? 0} / {s.quota ?? 0}
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
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (s) => (
        <div className="flex justify-center gap-2 text-gray-500">
          <button
            className="hover:text-yellow-600"
            onClick={() => handleEdit(s.id)}
          >
            <Edit size={18} />
          </button>

          <button
            className="hover:text-red-500"
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
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Các buổi hoạt động
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm"
        >
          <PlusCircle size={18} /> Thêm buổi
        </button>
      </div>

      <TableComponent
        columns={columns}
        data={filteredSessions}
        loading={isLoading}
      />
    </div>
  );
};

export default SessionListPage;
