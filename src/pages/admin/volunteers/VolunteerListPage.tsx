// src/pages/admin/volunteers/VolunteerListPage.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  Lock,
  Key,
  UserCheck,
  Filter,
  Search,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoVolunteers } from "./volunteerData";
import { VolunteerResource, VolunteerStatus } from "@/types/volunteer.type";
import { addAdminVolunteerFormRoute, editAdminVolunteerFormRoute } from "@/routes/admin";
import VolunteerPendingModal from "./VolunteerPendingModal";
const VolunteerListPage: React.FC = () => {
  const navigate = useNavigate();

  const [volunteers, setVolunteers] = useState<VolunteerResource[]>(demoVolunteers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | VolunteerStatus>("ALL");

  const [showPending, setShowPending] = useState(false);

  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" || v.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAdd = () =>
    navigate({ to: addAdminVolunteerFormRoute.to });

  const handleEdit = (vid: string) =>
    navigate({ to: editAdminVolunteerFormRoute.to, params: { id: vid } });

  const handleDelete = (vid: string) => {
    if (confirm("Xác nhận xóa tình nguyện viên này?")) {
      setVolunteers(volunteers.filter((v) => v.id !== vid));
    }
  };

  const handleLock = (vid: string) => {
    if (confirm("Khóa tài khoản này?")) {
      setVolunteers(volunteers.map((v) =>
        v.id === vid ? { ...v, status: VolunteerStatus.LOCKED } : v
      ));
    }
  };

  const handleResetPassword = (vid: string) => {
    const newPassword = "newpass123"; // Giả lập, thực tế gửi email hoặc hiển thị
    alert(`Mật khẩu mới cho ${vid}: ${newPassword}`);
  };

  const getStatusBadge = (status: VolunteerStatus) => {
    switch (status) {
      case VolunteerStatus.APPROVED:
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Đã duyệt</span>;
      case VolunteerStatus.PENDING:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Chờ duyệt</span>;
      case VolunteerStatus.REJECTED:
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Từ chối</span>;
      case VolunteerStatus.LOCKED:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Khóa</span>;
      default:
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Hoạt động</span>;
    }
  };

  const columns: Column<VolunteerResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "fullName",
      title: "Họ tên",
      render: (v) => (
        <div className="flex items-center gap-2 font-medium text-[#355C7D]">
          <div className="w-8 h-8 bg-gray-200 rounded-full" /> {v.fullName}
        </div>
      ),
    },

    {
      key: "email",
      title: "Email",
      render: (v) => v.email,
    },

    {
      key: "phone",
      title: "SĐT",
      render: (v) => v.phone,
    },

    {
      key: "role",
      title: "Vai trò",
      render: (v) => v.role,
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (v) => getStatusBadge(v.status),
    },

    {
      key: "points",
      title: "Điểm",
      align: "center",
      render: (v) => v.points,
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (v) => (
        <div className="flex justify-center gap-2 text-gray-500">
          <button onClick={() => handleEdit(v.id)} className="hover:text-yellow-600" title="Chỉnh sửa">
            <Edit size={18} />
          </button>
          <button onClick={() => handleLock(v.id)} className="hover:text-red-500" title="Khóa tài khoản">
            <Lock size={18} />
          </button>
          <button onClick={() => handleResetPassword(v.id)} className="hover:text-blue-500" title="Cấp lại mật khẩu">
            <Key size={18} />
          </button>
          <button onClick={() => handleDelete(v.id)} className="hover:text-red-500" title="Xóa">
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
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Quản lý tình nguyện viên
        </h1>
        <div className="flex gap-3">
          <button onClick={() => setShowPending(true)} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm shadow-sm transition">
            <UserCheck size={18} /> Chờ duyệt ({volunteers.filter(v => v.status === VolunteerStatus.PENDING).length})
          </button>
          <button onClick={handleAdd} className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition">
            <PlusCircle size={18} /> Thêm tình nguyện viên
          </button>
        </div>
      </div>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm tình nguyện viên..."
            className="flex-1 outline-none text-sm text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]"
          >
            <option value="ALL">Tất cả</option>
            <option value={VolunteerStatus.APPROVED}>Đã duyệt</option>
            <option value={VolunteerStatus.PENDING}>Chờ duyệt</option>
            <option value={VolunteerStatus.REJECTED}>Từ chối</option>
            <option value={VolunteerStatus.LOCKED}>Khóa</option>
          </select>
        </div>
      </div>


      {/* Table */}
      <TableComponent columns={columns} data={filteredVolunteers} />

      {/* Modal danh sách chờ duyệt */}
      <VolunteerPendingModal
        open={showPending}
        onClose={() => setShowPending(false)}
        pendingVolunteers={volunteers.filter(v => v.status === VolunteerStatus.PENDING)}
        onApprove={(vid) => {
          setVolunteers(volunteers.map(v => v.id === vid ? { ...v, status: VolunteerStatus.APPROVED } : v));
        }}
        onReject={(vid) => {
          setVolunteers(volunteers.map(v => v.id === vid ? { ...v, status: VolunteerStatus.REJECTED } : v));
        }}
      />
    </div>
  );
};

export default VolunteerListPage;