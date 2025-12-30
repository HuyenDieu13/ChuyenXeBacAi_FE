import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  Lock,
  Key,
  Filter,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import {
  addAdminVolunteerFormRoute,
  editAdminVolunteerFormRoute,
} from "@/routes/admin";
import {
  useVolunteerApplications,
  useReviewVolunteerApplication,
} from "@/hooks/volunteer-application.hook";
import {
  RegistrationStatus,
  REGISTRATION_STATUS_LABEL,
} from "@/enum/status.enum";
import { VolunteerApplicationResource } from "@/types/volunteer-application.type";

const VolunteerListPage: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | RegistrationStatus
  >("ALL");

  const { data: volunteers, isLoading } = useVolunteerApplications({});
  const { mutate: reviewApplication } = useReviewVolunteerApplication();

  /* ================= FILTER ================= */
  const filteredVolunteers = volunteers?.data?.filter((v) => {
    const matchesSearch =
      v.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" || v.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* ================= HANDLERS ================= */
  const handleAdd = () =>
    navigate({ to: addAdminVolunteerFormRoute.to });

  const handleEdit = (id: string) =>
    navigate({ to: editAdminVolunteerFormRoute.to, params: { id } });

  const handleDelete = (id: string) => {
    if (confirm("Xác nhận xóa tình nguyện viên này?")) {
      // intentionally left empty
    }
  };



  /* ================= UI HELPERS ================= */
  function getStatusBadge(status: RegistrationStatus) {
    const label = REGISTRATION_STATUS_LABEL[status];
    switch (status) {
      case RegistrationStatus.APPROVED:
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            {label}
          </span>
        );
      case RegistrationStatus.PENDING:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            {label}
          </span>
        );
      case RegistrationStatus.REJECTED:
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            {label}
          </span>
        );
      case RegistrationStatus.CANCELLED:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {label}
          </span>
        );
      default:
        return null;
    }
  }

  /* ================= TABLE ================= */
  const columns: Column<VolunteerApplicationResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "full_name",
      title: "Họ tên",
      render: (v) => (
        <div className="flex items-center gap-2 font-medium text-[#355C7D]">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          {v.full_name}
        </div>
      ),
    },

    { key: "email", title: "Email", render: (v) => v.email },
    { key: "phone", title: "SĐT", render: (v) => v.phone },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (v) => getStatusBadge(v.status),
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (v) => {
        const isPending = v.status === RegistrationStatus.PENDING;
        const isApproved = v.status === RegistrationStatus.APPROVED;

        return (
          <div className="flex justify-center gap-2">
            {/* APPROVE */}
            <button
              disabled={!isPending}
              onClick={() =>
                reviewApplication({
                  id: v.id,
                  data: { status: RegistrationStatus.APPROVED },
                  volunteer: v,
                })
              }
              title="Duyệt"
              className={`p-1 rounded ${
                isPending
                  ? "text-green-600 hover:bg-green-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <CheckCircle size={18} />
            </button>

            {/* REJECT */}
            <button
              disabled={!isPending}
              onClick={() => {
                const reason = prompt("Nhập lý do từ chối");
                if (!reason) return;

                reviewApplication({
                  id: v.id,
                  data: {
                    status: RegistrationStatus.REJECTED,
                    rejectReason: reason.trim(),
                  },
                });
              }}
              title="Từ chối"
              className={`p-1 rounded ${
                isPending
                  ? "text-red-600 hover:bg-red-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <XCircle size={18} />
            </button>

            {/* OTHER ACTIONS */}
            <button
              onClick={() => handleEdit(v.id)}
              title="Chỉnh sửa"
              className="p-1 hover:text-yellow-600"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={() => handleDelete(v.id)}
              title="Xóa"
              className="p-1 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Quản lý tình nguyện viên
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm"
        >
          <PlusCircle size={18} />
          Thêm tình nguyện viên
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex items-center bg-white rounded-full px-4 py-2 border w-full sm:w-1/2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as any)
            }
            className="border rounded-full px-3 py-2 text-sm"
          >
            <option value="ALL">Tất cả</option>
            <option value={RegistrationStatus.PENDING}>Chờ duyệt</option>
            <option value={RegistrationStatus.APPROVED}>Đã duyệt</option>
            <option value={RegistrationStatus.REJECTED}>Từ chối</option>
            <option value={RegistrationStatus.CANCELLED}>Đã hủy</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <TableComponent
        columns={columns}
        data={filteredVolunteers ?? []}
        loading={isLoading}
      />
    </div>
  );
};

export default VolunteerListPage;
