import React, { useState } from "react";
import { demoVolunteers, Volunteer } from "./volunteerData";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Award,
  PlusCircle,
  Eye,
  Pencil,
  Trash2,
  Clock,
} from "lucide-react";
import avatarDefault from "@/assets/images/Home/avatar.jpg";
import { useNavigate } from "@tanstack/react-router";

const VolunteerListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE" | "PENDING">("ALL");
  const [volunteers, setVolunteers] = useState<Volunteer[]>(demoVolunteers);

  const filteredVolunteers = volunteers.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" ? true : v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xoá tình nguyện viên này không?")) {
      setVolunteers(volunteers.filter((v) => v.id !== id));
    }
  };

  const handleApprove = (id: string) => {
    setVolunteers(
      volunteers.map((v) =>
        v.id === id ? { ...v, status: "ACTIVE" } : v
      )
    );
  };

  const handleView = (id: string) => {
    navigate({ to: `/admin/volunteers/${id}` });
  };

  const handleEdit = (id: string) => {
    navigate({ to: `/admin/volunteers/form/${id}` });
  };

  const handleAdd = () => {
    navigate({ to: `/admin/volunteers/form` });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-bold text-[#355C7D]">Danh sách tình nguyện viên</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} /> Thêm mới
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
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
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="INACTIVE">Ngưng hoạt động</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#355C7D]/10 text-[#355C7D] font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Tình nguyện viên</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Số buổi</th>
              <th className="py-3 px-4 text-center">Trạng thái</th>
              <th className="py-3 px-4 text-center">Đánh giá</th>
              <th className="py-3 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map((v, i) => (
              <tr key={v.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{i + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={v.avatar || avatarDefault}
                    alt={v.name}
                    className="w-9 h-9 rounded-full border"
                  />
                  <span className="font-medium text-[#355C7D]">{v.name}</span>
                </td>
                <td className="py-3 px-4">{v.email}</td>
                <td className="py-3 px-4 text-center">{v.joinedSessions}</td>
                <td className="py-3 px-4 text-center">
                  {v.status === "ACTIVE" && (
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">
                      <CheckCircle size={14} /> Hoạt động
                    </span>
                  )}
                  {v.status === "PENDING" && (
                    <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs">
                      <Clock size={14} /> Chờ duyệt
                    </span>
                  )}
                  {v.status === "INACTIVE" && (
                    <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs">
                      <XCircle size={14} /> Ngưng
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="flex justify-center items-center gap-1 text-yellow-500">
                    <Award size={14} /> {v.rating.toFixed(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2 text-gray-500">
                    {v.status === "PENDING" && (
                      <button
                        className="hover:text-green-600"
                        onClick={() => handleApprove(v.id)}
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button
                      className="hover:text-[#355C7D]"
                      onClick={() => handleView(v.id)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="hover:text-yellow-600"
                      onClick={() => handleEdit(v.id)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="hover:text-red-500"
                      onClick={() => handleDelete(v.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVolunteers.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Không có tình nguyện viên nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerListPage;
