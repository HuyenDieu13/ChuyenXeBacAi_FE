import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";
import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoParticipants } from "./participantData";
import { ParticipantResource, RegistrationStatus, ParticipantRole } from "@/types/participant.type";
import { addAdminParticipantFormRoute, editAdminParticipantFormRoute } from "@/routes/admin";
interface ParticipantsListPageProps {
  campaignId: string;
}

const ParticipantsListPage: React.FC<ParticipantsListPageProps> = ({ campaignId }) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<ParticipantResource[]>(
    demoParticipants.filter((p) => p.campaignId === campaignId)
  );
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"ALL" | ParticipantRole>("ALL");

  const filteredParticipants = participants.filter(p =>
    (p.fullName?.toLowerCase().includes(search.toLowerCase())) &&
    (filterRole === "ALL" || p.role === filterRole)
  );

  // Thêm thành viên
  const handleAdd = () =>
    navigate({ to: addAdminParticipantFormRoute.to });
  // Duyệt đăng ký
  const handleApprove = (participantId: string, sessionId: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId
          ? {
            ...p,
            registrations: p.registrations.map((r) =>
              r.sessionId === sessionId
                ? { ...r, status: RegistrationStatus.APPROVED, reviewedAt: new Date().toISOString() }
                : r
            ),
            approvedSessions: p.approvedSessions + 1,
          }
          : p
      )
    );
  };

  // Từ chối đăng ký
  const handleReject = (participantId: string, sessionId: string) => {
    const reason = prompt("Lý do từ chối?");
    if (reason) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantId
            ? {
              ...p,
              registrations: p.registrations.map((r) =>
                r.sessionId === sessionId
                  ? {
                    ...r,
                    status: RegistrationStatus.REJECTED,
                    reviewedAt: new Date().toISOString(),
                    rejectedReason: reason,
                  }
                  : r
              ),
            }
            : p
        )
      );
    }
  };

  // Xóa thành viên khỏi chiến dịch
  const handleDelete = (id: string) => {
    if (confirm("Xóa tình nguyện viên khỏi chiến dịch này?")) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  // Xem chi tiết + phân nhiệm vụ
  const handleViewDetail = (id: string) => {
    navigate({
      to: editAdminParticipantFormRoute.to,
      params: { id: campaignId, participantId: id },
    });
  };

  // Xem lịch sử điểm danh
  const handleViewAttendance = (id: string) => {
    navigate({
      to: editAdminParticipantFormRoute.to,
      params: { id: campaignId, participantId: id },
    });
  };

  const columns: Column<ParticipantResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "fullName",
      title: "Họ tên",
      render: (p) => (
        <div className="font-medium text-[#355C7D] flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full border" />
          {p.fullName}
          {p.role === ParticipantRole.COORDINATOR && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Điều phối</span>
          )}
        </div>
      ),
    },

    {
      key: "phone",
      title: "SĐT",
      render: (p) => <span className="text-gray-700">{p.phone}</span>,
    },

    {
      key: "stats",
      title: "Thống kê",
      align: "center",
      render: (p) => (
        <div className="text-sm">
          <div>Đăng ký: {p.totalSessions}</div>
          <div className="text-green-600">Duyệt: {p.approvedSessions}</div>
          <div className="text-blue-600">Điểm danh: {p.attendedSessions}</div>
        </div>
      ),
    },

    {
      key: "pending",
      title: "Chờ duyệt",
      align: "center",
      render: (p) => {
        const pendingCount = p.registrations.filter((r) => r.status === RegistrationStatus.PENDING).length;
        return pendingCount > 0 ? (
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
            {pendingCount} buổi
          </span>
        ) : (
          <CheckCircle size={18} className="text-green-500 mx-auto" />
        );
      },
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (p) => (
        <div className="flex justify-center gap-3 text-gray-600">
          {/* Duyệt tất cả buổi đang chờ */}
          {p.registrations.some((r) => r.status === RegistrationStatus.PENDING) && (
            <>
              <button
                onClick={() => p.registrations.forEach((r) => r.status === RegistrationStatus.PENDING && handleApprove(p.id, r.sessionId))}
                className="hover:text-green-600"
                title="Duyệt tất cả"
              >
                <UserCheck size={18} />
              </button>
              <button
                onClick={() => p.registrations.forEach((r) => r.status === RegistrationStatus.PENDING && handleReject(p.id, r.sessionId))}
                className="hover:text-red-600"
                title="Từ chối tất cả"
              >
                <UserX size={18} />
              </button>
            </>
          )}

          {/* Xem chi tiết */}
          <button onClick={() => handleViewDetail(p.id)} className="hover:text-blue-600" title="Xem chi tiết">
            <Edit size={18} />
          </button>

          {/* Lịch sử điểm danh */}
          <button onClick={() => handleViewAttendance(p.id)} className="hover:text-purple-600" title="Lịch sử điểm danh">
            <Clock size={18} />
          </button>

          {/* Xóa khỏi chiến dịch */}
          <button onClick={() => handleDelete(p.id)} className="hover:text-red-500" title="Xóa khỏi chiến dịch">
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
        <div>
          <h1 className="text-[22px] font-bold text-[#355C7D]">Thành viên tham gia</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng: {participants.length} người • Chờ duyệt: {participants.reduce((sum, p) => sum + p.registrations.filter(r => r.status === RegistrationStatus.PENDING).length, 0)} buổi
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} /> Thêm thành viên
        </button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm thành viên..." className="flex-1 outline-none text-sm text-gray-700" />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select value={filterRole} onChange={e => setFilterRole(e.target.value as any)} className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]">
            <option value="ALL">Tất cả vai trò</option>
            <option value={ParticipantRole.VOLUNTEER}>Tình nguyện viên</option>
            <option value={ParticipantRole.COORDINATOR}>Điều phối</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={filteredParticipants} />
    </div>
  );
};

export default ParticipantsListPage;