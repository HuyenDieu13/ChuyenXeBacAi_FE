import React, { useState } from "react";
import { addAdminFinanceFormRoute } from "@/routes/admin";
import { useParams } from "@tanstack/react-router";
import { ArrowUpCircle, ArrowDownCircle, Search } from "lucide-react";

import { PlusCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import {
  useGetFinanceTransactions,
  useDeleteFinanceTransaction,
  useGetFinanceByCampaignId,
} from "@/hooks/finance.hook";
import { FinanceLedgerItem } from "@/types/content_finance";

interface FinanceListPageProps {
  campaignId: string;
}


const FinanceListPage: React.FC<FinanceListPageProps> = ({ campaignId }) => {
  /* ================= HEADER API (CŨ – GIỮ NGUYÊN) ================= */
  const { data: finance, isLoading: headerLoading } =
    useGetFinanceByCampaignId(campaignId);

  /* ================= LEDGER API (MỚI – ĐANG DÙNG) ================= */
  const { data, isLoading } = useGetFinanceTransactions(campaignId);
  const deleteMutation = useDeleteFinanceTransaction();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "IN" | "OUT">("ALL");

  const transactions = data?.items ?? [];
  const navigate = useNavigate();

  const filteredTransactions = transactions.filter(
    (t: { donorName: string; direction: string }) =>
      (!search || t.donorName?.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "ALL" || t.direction === filterType)
  );

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<FinanceLedgerItem>[] = [
    { key: "index", title: "#", render: (_, i) => i + 1 },

    {
      key: "direction",
      title: "Loại",
      render: (t) => (
        <span
          className={`flex items-center gap-1 font-medium ${
            t.direction === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {t.direction === "IN" ? (
            <ArrowUpCircle size={16} />
          ) : (
            <ArrowDownCircle size={16} />
          )}
          {t.direction === "IN" ? "Thu" : "Chi"}
        </span>
      ),
    },

    {
      key: "amount",
      title: "Số tiền",
      render: (t) => (
        <span
          className={`font-semibold ${
            t.direction === "IN" ? "text-green-600" : "text-red-600"
          }`}
        >
          {t.amount.toLocaleString("vi-VN")}₫
        </span>
      ),
    },

    {
      key: "occurred_at",
      title: "Ngày",
      render: (t) => new Date(t.occurred_at).toLocaleDateString("vi-VN"),
    },

    {
      key: "donorName",
      title: "Nguồn",
      render: (t) => t.donorName ?? "—",
    },

  ];

  if (headerLoading || isLoading) return <div>Loading...</div>;

  if (!finance) return <div>Không có dữ liệu tài chính</div>;

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* ================= HEADER / KPI (GIỮ NGUYÊN) ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#355C7D]">
            {finance.campaigntitle}
          </h1>
          <span className="text-sm text-gray-500">
            {finance.donorcount} người ủng hộ
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tiến độ gây quỹ</span>
            <span className="font-medium">{finance.progressPercent}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#355C7D]"
              style={{
                width: `${finance.progressPercent}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPI label="Mục tiêu" value={finance.goalamount ?? 0} />
          <KPI label="Đã quyên góp" value={finance.totalRaised ?? 0} green />
          <KPI label="Số dư quỹ" value={finance.currentbalance ?? 0} blue />
        </div>
      </div>

      {/* ================= SỔ CÁI GIAO DỊCH ================= */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#355C7D]">Sổ cái giao dịch</h2>

          <button
            onClick={() =>
              navigate({
                to: addAdminFinanceFormRoute.to,
                params: { id: campaignId, type: "IN" },
              })
            }
            className="flex items-center gap-2 px-4 py-2 bg-[#355C7D] text-white rounded-full text-sm hover:bg-[#26415D] transition"
          >
            <PlusCircle size={16} />
            Thêm giao dịch
          </button>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-full border w-1/2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo nguồn tiền..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border rounded-full px-4 py-2 text-sm"
          >
            <option value="ALL">Tất cả</option>
            <option value="IN">Thu</option>
            <option value="OUT">Chi</option>
          </select>
        </div>

        <TableComponent columns={columns} data={filteredTransactions} />
      </div>
    </div>
  );
};

export default FinanceListPage;

/* ================= KPI ================= */
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
        green ? "text-green-600" : blue ? "text-blue-600" : "text-gray-800"
      }`}
    >
      {value.toLocaleString("vi-VN")}₫
    </p>
  </div>
);
