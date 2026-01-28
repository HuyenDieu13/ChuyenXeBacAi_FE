import React, { useState } from "react";
import TableComponent, { Column } from "@/components/TableAdminComponent";
import { Search } from "lucide-react";
import { useRecentLogActivities } from "@/hooks/log.hook";
import { LogRecentActivityResponse } from "@/types/log.type";
import { formatDateVN } from "@/helpers/date";
type LogItem = LogRecentActivityResponse[number];



const LogListPage: React.FC = () => {
    const { data, isLoading } = useRecentLogActivities(20);
    const [search, setSearch] = useState("");

    const logsArray = data ?? [];
    const filteredLogs = logsArray.filter((item) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;

        return [item.entity_type, item.action, item.entity_id, item.adminEmail]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q));
    });

    /* =========================
       TABLE COLUMNS
    ========================= */
    const columns: Column<LogItem>[] = [
        {
            key: "index",
            title: "#",
            align: "center",
            render: (_, i) => i + 1,
        },
        {
            key: "entity",
            title: "Entity",
            render: (r: LogItem) => r.entity_type ?? "—",
        },
        {
            key: "action",
            title: "Hành động",
            render: (r: LogItem) => r.action ?? "—",
        },
        {
            key: "entity_id",
            title: "Entity ID",
            render: (r: LogItem) => r.entity_id ?? "—",
        },
        {
            key: "changed_at",
            title: "Thời gian",
            render: (r: LogItem) => r.changed_at ? formatDateVN(r.changed_at) : "—",
        },
        {
            key: "admin",
            title: "Người thao tác",
            render: (r: LogItem) => r.adminEmail ?? "—",
        },
        {
            key: "details",
            title: "Chi tiết thay đổi",
            render: (r: LogItem) => r.changeDetail ?? "—",
        },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-[#355C7D]">Danh sách nhật ký</h1>

                <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-4 py-2 border border-gray-200">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm nhật ký..."
                        className="flex-1 outline-none text-sm text-gray-700"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <TableComponent
                columns={columns}
                data={filteredLogs}
                loading={isLoading}
            />
        </div>
    );
};

export default LogListPage;
