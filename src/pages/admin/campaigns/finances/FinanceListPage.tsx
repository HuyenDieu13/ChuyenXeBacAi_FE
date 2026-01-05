import React, { useState } from "react";
import { addAdminFinanceFormRoute } from "@/routes/admin";
import {
  Activity,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  RefreshCcw,
  PlusCircle,
  Download,
  Calculator,
  Upload,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import TableComponent, { Column } from "@/components/TableAdminComponent";
import {
  useGetFinanceTransactions,
  useDeleteFinanceTransaction,
  useGetFinanceByCampaignId,
  useSyncTimo,
  useExportFinanceExcel,
  useRecalculateBalance,
  useImportTimoStatement,
  useGetFinancialHealth,
} from "@/hooks/finance.hook";
import { FinanceLedgerItem } from "@/types/content_finance";

interface FinanceListPageProps {
  campaignId: string;
}

const FinanceListPage: React.FC<FinanceListPageProps> = ({ campaignId }) => {
  const { data: financialHealth } = useGetFinancialHealth();
  const importTimoMutation = useImportTimoStatement();
  const handleImportTimo = (file: File) => {
    const importedBy = "13a2dcd1-0a43-43fd-8e96-789df4c39831"; // TODO: thay bằng userId thật

    importTimoMutation.mutate(
      { importedBy, file },
      {
        onSuccess: (res) => {
          alert(res.message);

          // reload data
          queryClient.invalidateQueries({
            queryKey: ["finance-transactions", campaignId],
          });
          queryClient.invalidateQueries({
            queryKey: ["finance-by-campaign", campaignId],
          });
        },
      }
    );
  };

  const recalcBalanceMutation = useRecalculateBalance();
  const handleRecalculateBalance = () => {
    recalcBalanceMutation.mutate(campaignId, {
      onSuccess: (res) => {
        alert(res.message);

        // refresh header + ledger
        queryClient.invalidateQueries({
          queryKey: ["finance-by-campaign", campaignId],
        });

        queryClient.invalidateQueries({
          queryKey: ["finance-transactions", campaignId],
        });
      },
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ================= API ================= */
  const { data: finance, isLoading: headerLoading } =
    useGetFinanceByCampaignId(campaignId);

  const { data, isLoading } = useGetFinanceTransactions(campaignId);
  const syncTimoMutation = useSyncTimo();
  const exportExcelMutation = useExportFinanceExcel();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "IN" | "OUT">("ALL");

  const transactions = data?.items ?? [];

  /* ================= HANDLERS ================= */
  const handleSyncTimo = () => {
    syncTimoMutation.mutate(undefined, {
      onSuccess: (res) => {
        alert(res.message);
        queryClient.invalidateQueries({
          queryKey: ["finance-transactions", campaignId],
        });
      },
    });
  };

  const handleExportExcel = () => {
    exportExcelMutation.mutate(campaignId, {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "finance.xlsx";
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  };

  const filteredTransactions = transactions.filter(
    (t: { donorName: string; direction: string }) =>
      (!search || t.donorName?.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "ALL" || t.direction === filterType)
  );

  /* ================= TABLE ================= */
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
      {/* HEADER */}
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
              style={{ width: `${finance.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPI label="Mục tiêu" value={finance.goalamount ?? 0} />
          <KPI label="Đã quyên góp" value={finance.totalRaised ?? 0} green />
          <KPI label="Số dư quỹ" value={finance.currentbalance ?? 0} blue />
        </div>
      </div>

      {/* LEDGER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#355C7D]">Sổ cái giao dịch</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRecalculateBalance}
              disabled={recalcBalanceMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border
      hover:bg-gray-50 transition disabled:opacity-60"
            >
              <Calculator
                size={16}
                className={
                  recalcBalanceMutation.isPending ? "animate-spin" : ""
                }
              />
              {recalcBalanceMutation.isPending
                ? "Đang tính lại..."
                : "Tính lại số dư"}
            </button>
            <button
              onClick={handleSyncTimo}
              disabled={syncTimoMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-gray-50"
            >
              <RefreshCcw
                size={16}
                className={syncTimoMutation.isPending ? "animate-spin" : ""}
              />
              Đồng bộ Timo
            </button>

            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border hover:bg-gray-50"
            >
              <Download size={16} />
              Xuất Excel
            </button>
            <label className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border cursor-pointer hover:bg-gray-50">
              <Upload size={16} />
              {importTimoMutation.isPending
                ? "Đang import..."
                : "Import sao kê"}
              <input
                type="file"
                accept=".xls,.xlsx"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportTimo(file);
                  e.target.value = "";
                }}
              />
            </label>
            {financialHealth && (
              <button
                onClick={() =>
                  alert(
                    `Số dư tổng: ${financialHealth.overallBalance.toLocaleString(
                      "vi-VN"
                    )}₫
Mục tiêu: ${financialHealth.totalGoalAmount.toLocaleString("vi-VN")}₫
Chờ đối soát: ${financialHealth.pendingReconcileAmount.toLocaleString(
                      "vi-VN"
                    )}₫`
                  )
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border font-medium
      ${
        financialHealth.status === "Healthy"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }
    `}
              >
                <Activity size={16} />
                {financialHealth.status}
              </button>
            )}

            <button
              onClick={() =>
                navigate({
                  to: addAdminFinanceFormRoute.to,
                  params: { id: campaignId, type: "IN" },
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-[#355C7D] text-white rounded-full text-sm hover:bg-[#26415D]"
            >
              <PlusCircle size={16} />
              Thêm giao dịch
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center px-4 py-2 rounded-full border w-1/2">
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
