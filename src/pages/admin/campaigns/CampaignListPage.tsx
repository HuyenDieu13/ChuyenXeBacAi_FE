import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoCampaigns } from "./campaignData";
import { CampaignResource, CampaignStatus } from "@/types/campaign.type";
import {
  addAdminCampaignFormRoute,
  editAdminCampaignFormRoute,
  adminCampaignDetailRoute,
} from "@/routes/admin";

const CampaignListPage: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<"ALL" | CampaignStatus>("ALL");

  const [campaigns] = useState<CampaignResource[]>(demoCampaigns);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleView = (id: string) =>
    navigate({ to: adminCampaignDetailRoute.to, params: { id } });

  const handleEdit = (id: string) =>
    navigate({ to: editAdminCampaignFormRoute.to, params: { id } });

  const handleAdd = () => navigate({ to: addAdminCampaignFormRoute.to });

  const handleDelete = (_id: string) => {
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa chiến dịch này? Hành động này không thể hoàn tác."
      )
    ) {
      alert("Xóa thành công (demo)");
    }
  };

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.ONGOING:
        return (
          <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs">
            <CheckCircle2 size={14} /> Đang diễn ra
          </span>
        );
      case CampaignStatus.PUBLISHED:
        return (
          <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs">
            <Clock size={14} /> Đã công khai
          </span>
        );
      case CampaignStatus.DRAFT:
        return (
          <span className="inline-flex items-center gap-1 text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs">
            Nháp
          </span>
        );
      case CampaignStatus.COMPLETED:
        return (
          <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 px-3 py-1 rounded-full text-xs">
            Hoàn thành
          </span>
        );
      case CampaignStatus.CANCELLED:
        return (
          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full text-xs">
            <XCircle size={14} /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  const columns: Column<CampaignResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1, align: "center" },

    {
      key: "title",
      title: "Chiến dịch",
      render: (c) => (
        <div className="font-semibold text-[#355C7D] text-sm">{c.title}</div>
      ),
    },

    {
      key: "time",
      title: "Thời gian",
      render: (c) => (
        <div className="flex items-center gap-1 text-gray-700 text-sm">
          <Calendar size={14} />
          {new Date(c.startDate).toLocaleDateString("vi-VN")} →{" "}
          {new Date(c.endDate).toLocaleDateString("vi-VN")}
        </div>
      ),
    },

    {
      key: "location",
      title: "Địa điểm",
      render: (c) => (
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin size={16} />
          <span className="truncate max-w-44">{c.location || "Không rõ"}</span>
        </div>
      ),
    },

    {
      key: "fund",
      title: "Quỹ",
      render: (c) => (
        <div className="text-sm font-medium">
          <div className="text-green-600">
            {c.collectedAmount.toLocaleString("vi-VN")}₫
          </div>
          <div className="text-xs text-gray-500 mb-1">
            / {c.goalAmount.toLocaleString("vi-VN")}₫
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${Math.min(
                  (c.collectedAmount / c.goalAmount) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      ),
    },

    {
      key: "volunteers",
      title: "TNV",
      align: "center",
      render: (c) => (
        <div className="flex items-center justify-center gap-1 text-gray-700">
          <Users size={16} /> {c.registeredVolunteers || 0}
        </div>
      ),
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (c) => getStatusBadge(c.status),
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (c) => (
        <div className="flex justify-center gap-2 text-gray-500">
          <button className="hover:text-[#355C7D]" onClick={() => handleView(c.id)}>
            <Eye size={18} />
          </button>
          <button
            className="hover:text-yellow-600"
            onClick={() => handleEdit(c.id)}
          >
            <Pencil size={18} />
          </button>
          <button
            className="hover:text-red-500"
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
          className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] 
            text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
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
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]"
          >
            <option value="ALL">Tất cả</option>
            <option value={CampaignStatus.ONGOING}>Đang diễn ra</option>
            <option value={CampaignStatus.PUBLISHED}>Đã công khai</option>
            <option value={CampaignStatus.DRAFT}>Nháp</option>
            <option value={CampaignStatus.COMPLETED}>Hoàn thành</option>
            <option value={CampaignStatus.CANCELLED}>Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={filteredCampaigns} />
    </div>
  );
};

export default CampaignListPage;
