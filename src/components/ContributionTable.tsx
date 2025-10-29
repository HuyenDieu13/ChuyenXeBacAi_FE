import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Contribution {
  id: number;
  donor: string;
  date: string;
  amount: string;
  note?: string;
}

const ContributionTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"thansoake" | "ngansach">("thansoake");

  // Dữ liệu mẫu
  const contributions: Contribution[] = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    donor: "Nguyễn Đặng Như Ngọc xin mở hàng",
    date: "20/10",
    amount: "2.000.000",
    note: "null",
  }));

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openRowsDropdown, setOpenRowsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(contributions.length / rowsPerPage);
  const paginated = contributions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenRowsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRows = (value: number) => {
    setRowsPerPage(value);
    setPage(1);
    setOpenRowsDropdown(false);
  };

  return (
    <section className="w-full flex flex-col items-start mt-6">
      {/* ====== TIÊU ĐỀ ====== */}
      <div className="flex justify-start mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
          Bảng đóng góp
        </h2>
      </div>

      {/* ====== TAB LỰA CHỌN ====== */}
      <div className="flex items-center gap-6 border-b w-full mb-6">
        <button
          onClick={() => setActiveTab("thansoake")}
          className={`flex items-center gap-2 pb-2 ${activeTab === "thansoake"
            ? "text-[#355C7D] border-b-4 border-[#89CFF0]"
            : "text-gray-500 hover:text-[#355C7D]"
            }`}
        >
          Thần sao kê
          <span
            className={`text-sm ml-1 px-2 py-0.5 rounded-full ${activeTab === "thansoake"
              ? "bg-[#F49F04] text-white"
              : "bg-gray-200 text-gray-600"
              }`}
          >
            20
          </span>
        </button>

        <button
          onClick={() => setActiveTab("ngansach")}
          className={`flex items-center gap-2 pb-2 ${activeTab === "ngansach"
            ? "text-[#355C7D] border-b-4 border-[#355C7D]"
            : "text-gray-500 hover:text-[#355C7D]"
            }`}
        >
          Ngân sách thực chi
          <span
            className={`text-sm ml-1 px-2 py-0.5 rounded-full ${activeTab === "ngansach"
              ? "bg-[#F49F04] text-white"
              : "bg-gray-200 text-gray-600"
              }`}
          >
            48
          </span>
        </button>
      </div>

      {/* ====== BẢNG DỮ LIỆU ====== */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-[#f8f9fa] text-[#355C7D] font-semibold">
              <th className="px-4 py-3">Người và nội dung quyên góp</th>
              <th className="px-4 py-3">Thời gian</th>
              <th className="px-4 py-3 text-right">Số tiền</th>
              <th className="px-4 py-3">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.donor}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 text-right">{item.amount}</td>
                <td className="px-4 py-3">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====== PHÂN TRANG ====== */}
      <div className="flex justify-end gap-4 items-center mt-4 w-full text-sm text-gray-600">
        {/* Rows per page dropdown */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <span>Rows per page:</span>
          <div className="relative">
            <button
              onClick={() => setOpenRowsDropdown(!openRowsDropdown)}
              className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-yellow-500 transition"
            >
              <span className="text-gray-700 text-sm">{rowsPerPage}</span>
              <ChevronDown
                size={16}
                className={`ml-2 transition-transform ${openRowsDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {openRowsDropdown && (
              <ul className="absolute right-0 mt-1 w-16 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                {[5, 10, 20, 50].map((num) => (
                  <li
                    key={num}
                    onClick={() => handleSelectRows(num)}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-yellow-100 ${num === rowsPerPage ? "bg-yellow-50 font-medium text-yellow-700" : "text-gray-700"
                      }`}
                  >
                    {num}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Trang */}
        <div className="flex items-center gap-4">
          <span>
            {Math.min((page - 1) * rowsPerPage + 1, contributions.length)} -{" "}
            {Math.min(page * rowsPerPage, contributions.length)} of {contributions.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-2 py-1 rounded ${page === 1
                ? "text-gray-400"
                : "text-[#355C7D] hover:bg-gray-200"
                }`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-2 py-1 rounded ${page === totalPages
                ? "text-gray-400"
                : "text-[#355C7D] hover:bg-gray-200"
                }`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionTable;
