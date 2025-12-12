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

import TableComponent, { Column } from "@/components/TableAdminComponent";
import { demoTransactions } from "./transactionData";
import { TransactionResource, TransactionType, TransactionStatus } from "@/types/transaction.type";
import { addAdminFinanceFormRoute, editAdminFinanceFormRoute } from "@/routes/admin";

interface FinanceListPageProps {
    campaignId: string;
}

const FinanceListPage: React.FC<FinanceListPageProps> = ({ campaignId }) => {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState<TransactionResource[]>(
        demoTransactions.filter((t) => t.campaignId === campaignId)
    );

    const [anomalyDetected, setAnomalyDetected] = useState(false);
    const [anomalyMessage, setAnomalyMessage] = useState("");
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<"ALL" | TransactionType>("ALL");

    const filteredTransactions = transactions.filter(t =>
        (t.description.toLowerCase().includes(search.toLowerCase())) &&
        (filterType === "ALL" || t.type === filterType)
    );

    const handleAdd = () =>
        navigate({ to: addAdminFinanceFormRoute.to, params: { id: campaignId } });

    const handleEdit = (tid: string) =>
        navigate({ to: editAdminFinanceFormRoute.to, params: { id: campaignId, transactionId: tid } });

    const handleDelete = (tid: string) => {
        if (confirm("Xác nhận xóa giao dịch này?")) {
            setTransactions(transactions.filter((t) => t.id !== tid));
        }
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Giả lập import Excel - Thực tế dùng XLSX library
            alert("Đã import file Excel thành công!");
            // Thêm logic parse file và update transactions
        }
    };

    const checkAnomalies = () => {
        let anomalies = [];
        let total = 0;

        transactions.forEach((t) => {
            total += t.amount;
            if (t.amount === 0) anomalies.push(`Giao dịch ${t.id} có số tiền 0.`);
            if (!t.receipt && t.amount < -100000) anomalies.push(`Giao dịch chi ${t.id} thiếu hóa đơn.`);
        });

        if (total < 0) anomalies.push("Tổng quỹ đang âm!");

        setAnomalyDetected(anomalies.length > 0);
        setAnomalyMessage(anomalies.join("\n"));
        if (anomalies.length > 0) {
            alert(`Dữ liệu bất thường:\n${anomalies.join("\n")}`);
        } else {
            alert("Dữ liệu bình thường, không có bất thường!");
        }
    };

    const columns: Column<TransactionResource>[] = [
        { key: "index", title: "#", render: (_, i) => i + 1 },

        {
            key: "type",
            title: "Loại",
            render: (t) => (
                <span className={`flex items-center gap-1 ${t.type === TransactionType.INCOME ? "text-green-600" : "text-red-600"}`}>
                    {t.type === TransactionType.INCOME ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />}
                    {t.type === TransactionType.INCOME ? "Thu" : "Chi"}
                </span>
            ),
        },

        {
            key: "amount",
            title: "Số tiền",
            render: (t) => (
                <span className={t.amount > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {Math.abs(t.amount).toLocaleString("vi-VN")}₫
                </span>
            ),
        },

        {
            key: "date",
            title: "Ngày",
            render: (t) => new Date(t.date).toLocaleDateString("vi-VN"),
        },

        {
            key: "description",
            title: "Mô tả",
            render: (t) => (
                <div>
                    {t.description}
                    {t.source && <p className="text-sm text-gray-500">Nguồn: {t.source}</p>}
                </div>
            ),
        },

        {
            key: "status",
            title: "Trạng thái",
            align: "center",
            render: (t) => {
                switch (t.status) {
                    case TransactionStatus.APPROVED:
                        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Đã duyệt</span>;
                    case TransactionStatus.PENDING:
                        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Chờ duyệt</span>;
                    case TransactionStatus.REJECTED:
                        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Bị từ chối</span>;
                }
            },
        },

        {
            key: "actions",
            title: "Thao tác",
            align: "center",
            render: (t) => (
                <div className="flex justify-center gap-3 text-gray-600">
                    <button onClick={() => handleEdit(t.id)} className="hover:text-yellow-600" title="Chỉnh sửa">
                        <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="hover:text-red-500" title="Xóa">
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
                <h1 className="text-[22px] font-bold text-[#355C7D]">Quản lý quỹ chiến dịch</h1>

                <div className="flex gap-3">

                    {/* IMPORT EXCEL – size giống Session */}
                    <label
                        htmlFor="import-excel"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 
            text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm cursor-pointer transition"
                    >
                        <UploadCloud size={18} />
                        Import Excel
                        <input
                            id="import-excel"
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleImport}
                            className="hidden"
                        />
                    </label>

                    {/* ADD TRANSACTION – giống Session */}
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-[#355C7D] hover:bg-[#26415D] 
            text-white px-4 py-2 rounded-full text-sm shadow-sm transition"
                    >
                        <PlusCircle size={18} />
                        Thêm giao dịch
                    </button>

                    {/* CHECK ANOMALIES – style đồng bộ */}
                    <button
                        onClick={checkAnomalies}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-sm transition
                ${anomalyDetected
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-orange-500 hover:bg-orange-600 text-white"
                            }`}
                    >
                        <AlertTriangle size={18} />
                        Kiểm tra bất thường
                    </button>
                </div>
            </div>


            {/* Thông báo bất thường */}
            {anomalyDetected && anomalyMessage && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                    <p className="font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} /> Dữ liệu bất thường:
                    </p>
                    <pre className="whitespace-pre-wrap text-sm">{anomalyMessage}</pre>
                </div>
            )}
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm giao dịch..." className="flex-1 outline-none text-sm text-gray-700" />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-500" />
                    <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="border border-gray-300 rounded-full px-3 py-2 text-sm outline-none hover:border-[#355C7D]">
                        <option value="ALL">Tất cả</option>
                        <option value={TransactionType.INCOME}>Thu</option>
                        <option value={TransactionType.EXPENSE}>Chi</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <TableComponent columns={columns} data={filteredTransactions} />
        </div>
    );
};

export default FinanceListPage;