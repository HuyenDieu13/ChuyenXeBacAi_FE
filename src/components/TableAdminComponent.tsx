import React from "react";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface TableComponentProps<T> {
  columns: Column<T>[];
  data: T[];
  noDataText?: string;
  headerBg?: string;
  textColor?: string;
  striped?: boolean;
}

/**
 * 🌟 TableComponent — Bảng tái sử dụng cho toàn hệ thống (Admin, Fund, Campaign...)
 */
export function TableComponent<T>({
  columns,
  data,
  noDataText = "Không có dữ liệu phù hợp.",
  headerBg = "bg-[#355C7D]/10",
  textColor = "text-[#355C7D]",
  striped = true,
}: TableComponentProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full border-collapse text-sm">
        <thead className={`${headerBg} ${textColor} font-semibold`}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key.toString()}
                className={`py-3 px-4 text-${col.align ?? "left"} ${col.className ?? ""}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr
                key={i}
                className={`border-t ${
                  striped && i % 2 === 1 ? "bg-gray-50/40" : ""
                } hover:bg-gray-50 transition-colors`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key.toString()}
                    className={`py-3 px-4 text-${col.align ?? "left"} ${col.className ?? ""}`}
                  >
                    {col.render ? col.render(item, i) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-10"
              >
                {noDataText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
