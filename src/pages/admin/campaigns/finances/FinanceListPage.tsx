// src/pages/admin/campaigns/finance/FinanceListPage.tsx
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  AlertTriangle,
  UploadCloud,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Filter,
} from "lucide-react";

import { useGetFinanceByCampaignId } from "@/hooks/finance.hook";
import TableComponent, { Column } from "@/components/TableAdminComponent";
import { TransactionResource, TransactionType, TransactionStatus } from "@/types/transaction.type";
import { addAdminFinanceFormRoute, editAdminFinanceFormRoute } from "@/routes/admin";

interface FinanceListPageProps {
  campaignId: string;
}

const FinanceListPage: React.FC<FinanceListPageProps> = ({ campaignId }) => {
  const navigate = useNavigate();

  /* ================= API ================= */
  const { data: finance, isLoading } = useGetFinanceByCampaignId(campaignId);

  /* ================= STATE ================= */
  const [transactions, setTransactions] = useState<TransactionResource[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState<"ALL" | TransactionType>("ALL");

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "ALL" || t.type === filterType)
  );

  /* ================= HANDLERS ================= */
  const handleAdd = () =>
    navigate({ to: addAdminFinanceFormRoute.to, params: { id: campaignId } });

  const handleEdit = (tid: string) =>
    navigate({
      to: editAdminFinanceFormRoute.to,
      params: { id: campaignId, transactionId: tid },
    });

  const handleDelete = (tid: string) => {
    if (confirm("Xác nhận xóa giao dịch này?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== tid));
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<TransactionResource>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "type",
      title: "Loại",
      render: (t) => (
        <span
          className={`flex items-center gap-1 ${
            t.type === TransactionType.INCOME
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {t.type === TransactionType.INCOME ? (
            <ArrowUpCircle size={16} />
          ) : (
            <ArrowDownCircle size={16} />
          )}
          {t.type === TransactionType.INCOME ? "Thu" : "Chi"}
        </span>
      ),
    },

    {
      key: "amount",
      title: "Số tiền",
      render: (t) => (
        <span
          className={`font-medium ${
            t.amount > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {Math.abs(t.amount).toLocaleString("vi-VN")}₫
        </span>
      ),
    },

    {
      key: "date",
      title: "Ngày",
      render: (t) =>
        new Date(t.date).toLocaleDateString("vi-VN"),
    },

    {
      key: "description",
      title: "Mô tả",
    },

    {
      key: "status",
      title: "Trạng thái",
      align: "center",
      render: (t) => {
        if (t.status === TransactionStatus.APPROVED)
          return (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              Đã duyệt
            </span>
          );
        if (t.status === TransactionStatus.PENDING)
          return (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
              Chờ duyệt
            </span>
          );
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            Từ chối
          </span>
        );
      },
    },

    {
      key: "actions",
      title: "Thao tác",
      align: "center",
      render: (t) => (
        <div className="flex justify-center gap-3">
          <button onClick={() => handleEdit(t.id)}>
            <Edit size={18} />
          </button>
          <button onClick={() => handleDelete(t.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

if (isLoading) return <div>Loading...</div>;

if (!finance) {
  return <div>Không có dữ liệu tài chính</div>;
}


  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* ================= DASHBOARD HEADER ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#355C7D]">
            {finance.campaigntitle}
            </h1>
          <span className="text-sm text-gray-500">
            {finance.donorcount} người ủng hộ
          </span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tiến độ gây quỹ</span>
            <span className="font-medium">
              {finance.progressPercent}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#355C7D]"
              style={{ width: `${finance.progressPercent}%` }}
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPI label="Mục tiêu" value={finance.goalamount ?? 0} />
          <KPI label="Đã quyên góp" value={finance.totalRaised ?? 0} green />
          <KPI label="Số dư quỹ" value={finance.currentbalance ?? 0} blue />
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center bg-white px-4 py-2 rounded-full border w-1/2">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm giao dịch..."
            className="flex-1 outline-none text-sm"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as any)
          }
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="ALL">Tất cả</option>
          <option value={TransactionType.INCOME}>Thu</option>
          <option value={TransactionType.EXPENSE}>Chi</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <TableComponent columns={columns} data={filteredTransactions} />
    </div>
  );
};

export default FinanceListPage;

/* ================= SUB COMPONENT ================= */
const KPI = ({
  label,
  value,
  green,
  blue,
}: {
  label: string;
  value: number;
  green?: boolean;
  blue?: boolean;
}) => (
  <div className="bg-gray-50 rounded-xl p-4 border">
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`text-lg font-bold ${
        green
          ? "text-green-600"
          : blue
          ? "text-blue-600"
          : "text-gray-800"
      }`}
    >
      {value.toLocaleString("vi-VN")}₫
    </p>
  </div>
);
