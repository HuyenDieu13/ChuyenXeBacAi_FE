import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateVN } from "@/helpers/date";
export interface Contribution {

  donor?: string;
  name?: string;
  donorName?: string;
  title?: string;

  // possible date fields
  createdAt?: string;
  created_at?: string;
  time?: string;
  occurred_at?: string;
  date?: string;

  amount?: number;
  // possible note/description fields
  note?: string;
  description?: string;
}

interface Props {
  incomes?: Contribution[];
  expenses?: Contribution[];
}

const ContributionTable: React.FC<Props> = ({ incomes, expenses }) => {
  const [activeTab, setActiveTab] =
    useState<"thansoake" | "ngansach">("thansoake");

  const data = useMemo(() => {
    const src = activeTab === "thansoake" ? incomes ?? [] : expenses ?? [];
    return src;
  }, [activeTab, incomes, expenses]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openRowsDropdown, setOpenRowsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil((data?.length ?? 0) / rowsPerPage);
  const paginated = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [rowsPerPage, activeTab]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenRowsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full flex flex-col items-start mt-6">
      {/* ====== TITLE ====== */}
      <div className="flex justify-start mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
          Bảng đóng góp
        </h2>
      </div>

      {/* ====== TABS ====== */}
      <div className="flex items-center gap-6 border-b w-full mb-6">
        {[
          { key: "thansoake", label: "Thần sao kê", count: incomes?.length ?? 0 },
          { key: "ngansach", label: "Ngân sách thực chi", count: expenses?.length ?? 0 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 pb-2 ${activeTab === tab.key
              ? "text-[#355C7D] border-b-4 border-[#89CFF0]"
              : "text-gray-500 hover:text-[#355C7D]"
              }`}
          >
            {tab.label}
            <span
              className={`text-sm ml-1 px-2 py-0.5 rounded-full ${activeTab === tab.key
                ? "bg-[#F49F04] text-white"
                : "bg-gray-200 text-gray-600"
                }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ====== TABLE ====== */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-[#f8f9fa] text-[#355C7D] font-semibold">
                <th className="px-4 py-3">
                {activeTab === "thansoake" ? "Người đóng góp" : "Nội dung"}
                </th>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3 text-right">Số tiền</th>
              <th className="px-4 py-3">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={`${item.createdAt ?? ""}-${item.donor ?? ""}`} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {(
                    item.donor ||
                    item.name ||
                    item.donorName ||
                    item.title ||
                    "-"
                  )}
                </td>
                <td className="px-4 py-3">
                  {(() => {
                    const d =
                      item.createdAt ||
                      item.created_at ||
                      item.time ||
                      item.occurred_at ||
                      item.date ||
                      item.date;
                    return d ? formatDateVN(d) : "-";
                  })()}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-[#F49F04]">
                  {typeof item.amount === "number" ? item.amount.toLocaleString("vi-VN") : "-"}
                </td>
                <td className="px-4 py-3">{item.note || item.description || "-"}</td>
              </tr>
            ))}

            {!paginated.length && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ====== PAGINATION ====== */}
      <div className="flex justify-end gap-4 items-center mt-4 w-full text-sm text-gray-600">
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <span>Rows per page:</span>
          <button
            onClick={() => setOpenRowsDropdown(!openRowsDropdown)}
            className="flex items-center px-4 py-2 bg-white border rounded-lg"
          >
            {rowsPerPage}
            <ChevronDown className="ml-2" size={16} />
          </button>

          {openRowsDropdown && (
            <ul className="absolute right-0 mt-1 w-16 bg-white border rounded-lg shadow-lg z-30">
              {[5, 10, 20, 50].map((num) => (
                <li
                  key={num}
                  onClick={() => setRowsPerPage(num)}
                  className="px-4 py-2 cursor-pointer hover:bg-yellow-100"
                >
                  {num}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ChevronLeft
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="cursor-pointer"
          />
          <ChevronRight
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default ContributionTable;
