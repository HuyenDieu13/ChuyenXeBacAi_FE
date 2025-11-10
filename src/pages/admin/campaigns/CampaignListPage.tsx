import React, { useState } from "react";
import { demoCampaigns, Campaign } from "./campaignData";
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  Timer,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import TableComponent, { Column } from "@/components/TableAdminComponent";
import { addAdminCampaignFormRoute, editAdminCampaignFormRoute, adminSessionIndexRoute  } from "@/routes/admin";
const CampaignListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | "ONGOING" | "UPCOMING" | "ENDED" | "CANCELLED">("ALL");
  const [campaigns, setCampaigns] = useState<Campaign[]>(demoCampaigns);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" ? true : c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn hủy chiến dịch này không?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  const handleView = (id: string) => navigate({ to: adminSessionIndexRoute.to, params: { id } });
  const handleEdit = (id: string) => navigate({ to: editAdminCampaignFormRoute.to, params: { id } });
  const handleAdd = () => navigate({ to: addAdminCampaignFormRoute.to });
  const handleSessions = (id: string) =>
    navigate({ to: adminSessionIndexRoute.to, params: { id } });
  // 🔹 Định nghĩa cột bảng
  const columns: Column<Campaign>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },
    {
      key: "name",
      title: "Tên chiến dịch",
      render: (c) => (
        <div className="font-medium text-[#355C7D]">{c.name}</div>
      ),
    },
    {
      key: "time",
      title: "Thời gian",
      render: (c) => (
        <div className="text-sm text-gray-700 flex flex-col items-start">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {c.startDate} → {c.endDate}
          </span>
        </div>
      ),
    },
    {
      key: "location",
      title: "Địa điểm",
      render: (c) => (
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin size={14} /> {c.location}
        </div>
      ),
    },
    {
      key: "status",
      title: "Tình trạng",
      align: "center",
      render: (c) => (
        <>
          {c.status === "ONGOING" && (
            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">
              <CheckCircle2 size={14} /> Đang diễn ra
            </span>
          )}
          {c.status === "UPCOMING" && (
            <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs">
              <Timer size={14} /> Sắp diễn ra
            </span>
          )}
          {c.status === "ENDED" && (
            <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-xs">
              <XCircle size={14} /> Đã kết thúc
            </span>
          )}
          {c.status === "CANCELLED" && (
            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs">
              <XCircle size={14} /> Đã hủy
            </span>
          )}
        </>
      ),
    },
    {
      key: "targetFund",
      title: "Quỹ mục tiêu",
      align: "center",
      render: (c) => (
        <span className="flex justify-center items-center gap-1 text-[#355C7D] font-semibold">
          <DollarSign size={14} />
          {c.targetFund.toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (c) => (
        <div className="flex justify-center gap-2 text-gray-500">
          {/* Các thao tác chính */}
          <button
            className="hover:text-[#355C7D]"
            title="Xem chi tiết"
            onClick={() => handleView(c.id)}
          >
            <Eye size={18} />
          </button>
          <button
            className="hover:text-yellow-600"
            title="Chỉnh sửa"
            onClick={() => handleEdit(c.id)}
          >
            <Pencil size={18} />
          </button>
          <button
            className="hover:text-red-500"
            title="Xóa chiến dịch"
            onClick={() => handleDelete(c.id)}
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
        <h1 className="text-[22px] font-bold text-[#355C7D]">
          Danh sách chiến dịch
        </h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
        >
          <PlusCircle size={18} /> Tạo chiến dịch
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm chiến dịch..."
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
              setFilterStatus(e.target.value as any)
            }
            className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]"
          >
            <option value="ALL">Tất cả</option>
            <option value="ONGOING">Đang diễn ra</option>
            <option value="UPCOMING">Sắp diễn ra</option>
            <option value="ENDED">Đã kết thúc</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={filteredCampaigns} />
    </div>
  );
};

export default CampaignListPage;
