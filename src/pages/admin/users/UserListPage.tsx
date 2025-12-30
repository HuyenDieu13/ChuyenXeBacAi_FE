import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  Filter,
  PlusCircle,
  RotateCcw,
  Pencil,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { UserResource } from "@/types/user.type";
import { UserStatus, USER_STATUS_LABEL } from "@/enum/status.enum";
import { Gender, GENDER_LABEL } from "@/enum/gender";
import {
  addAdminUserFormRoute,
  editAdminUserFormRoute,
} from "@/routes/admin";
import { useUsers } from "@/hooks/user.hook";
import { useResetPassword } from "@/hooks/auth.hooks";
const PLACEHOLDER_AVATAR =
  "https://placehold.co/80x80?text=Avatar";


const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const {mutate: resetPassword} = useResetPassword();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | UserStatus>("ALL");

  const { data, isLoading } = useUsers({ q: search });

  const users = data?.data ?? [];

  /* =========================
     FILTER
  ========================= */
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.profile?.full_name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" || u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* =========================
     ACTIONS
  ========================= */
  const handleEdit = (id: string) =>
    navigate({ to: editAdminUserFormRoute.to, params: { id } });

  const handleAdd = () =>
    navigate({ to: addAdminUserFormRoute.to });

  const handleResetPassword = (id: string) => {
    resetPassword({ id, data: { tempLength: 0, sendEmail: true } });
  }
  /* =========================
     STATUS BADGE
  ========================= */
  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs">
            <CheckCircle2 size={14} />
            {USER_STATUS_LABEL[status]}
          </span>
        );

      case "INACTIVE":
        return (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs">
            <XCircle size={14} />
            {USER_STATUS_LABEL[status]}
          </span>
        );
    }
  };

  /* =========================
     TABLE COLUMNS
  ========================= */
  const columns: Column<UserResource>[] = [
    {
      key: "index",
      title: "#",
      align: "center",
      render: (_, i) => i + 1,
    },

    {
      key: "user",
      title: "Người dùng",
      render: (u) => (
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="w-16 h-16 rounded-xl overflow-hidden border bg-gray-100 flex-shrink-0">
            <img
              src={u.profile?.avatar_url || PLACEHOLDER_AVATAR}
              alt={u.profile?.full_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_AVATAR;
              }}
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <span className="font-semibold text-[#355C7D] text-sm">
              {u.profile?.full_name}
            </span>
            <span className="text-xs text-gray-500">
              {u.email}
            </span>
            {u.profile?.phone && (
              <span className="text-xs text-gray-400">
                {u.profile?.phone}
              </span>
            )}
          </div>
        </div>
      ),
    },

    {
      key: "profile",
      title: "Thông tin",
      render: (u) => (
        <div className="text-sm text-gray-700 min-w-[140px]">
          <div>
            <User size={14} className="inline mr-1 text-gray-400" />
            {u.profile?.gender
              ? GENDER_LABEL[u.profile.gender as Gender]
              : "—"}
          </div>
          <div className="text-xs text-gray-500">
            Tuổi: {u.profile?.age ?? "—"}
          </div>
        </div>
      ),
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (u) => u.status ? getStatusBadge(u.status) : "—",
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (u) => (
        <div className="flex justify-center gap-2 text-gray-500">
          <button
            className="hover:text-yellow-600"
            onClick={() => handleEdit(u.id)}
          >
            <Pencil size={18} />
          </button>
          <button
            className="hover:text-blue-600"
            onClick={() => handleResetPassword(u.id)}
          >
            <RotateCcw size={18} />
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
          Danh sách người dùng
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D]
          text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} />
          Thêm mới
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="flex-1 outline-none text-sm text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "ALL" | UserStatus)
            }
            className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]"
          >
            <option value="ALL">Tất cả</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Ngưng hoạt động</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent
        columns={columns}
        data={filteredUsers}
        loading={isLoading}
      />
    </div>
  );
};

export default UserListPage;
