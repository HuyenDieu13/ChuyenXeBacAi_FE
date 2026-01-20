import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SummaryItem {
    name: string;
    value: number;
    color: string;
}

interface SummaryData {
    period: string; // kỳ thống kê (VD: tháng 10)
    items: SummaryItem[];
}

interface SummarySectionProps {
    dataOptions: SummaryData[]; // danh sách kỳ và data
}

const SummarySection: React.FC<SummarySectionProps> = ({ dataOptions }) => {
    // chọn kỳ đầu tiên làm mặc định (an toàn nếu rỗng)
    const selectedData = dataOptions && dataOptions.length ? dataOptions[0] : { period: "", items: [] };

    const total = (selectedData.items || []).reduce((sum, i) => sum + (i?.value || 0), 0);

    return (
        <section className="w-full flex flex-col items-start mt-12">
            {/* ====== TIÊU ĐỀ ====== */}
            <div className="flex justify-start mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                    Tổng kết
                </h2>
            </div>

            {/* ====== KHỐI NỘI DUNG ====== */}
            <div className="w-full bg-[#E9F5FF] rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 shadow-sm">
                {/* Biểu đồ tròn + tổng thu */}
                <div className="flex bg-white border rounded-lg shadow-lg gap-4 p-4 flex-1 min-w-0">
                    <div className="flex flex-col items-center sm:items-start min-w-0">
                        <h3 className="text-gray-700 text-base font-medium mb-2">Tổng thu được</h3>
                        <div className="text-3xl font-extrabold text-[#355C7D] mb-3">
                            {total.toLocaleString()}
                        </div>

                        {selectedData.items.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 mb-2 text-sm text-gray-600 min-w-0">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                <div className="truncate">{item.name}</div>
                            </div>
                        ))}
                    </div>

                    {/* Biểu đồ */}
                    <div className="w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] flex-shrink-0">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={selectedData.items as any}
                                    dataKey="value"
                                    innerRadius={35}
                                    outerRadius={55}
                                    paddingAngle={4}
                                >
                                    {selectedData.items.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Thống kê chi tiết */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-auto flex-1 min-w-0">
                    <h4 className="text-[#355C7D] text-base font-semibold">
                        Thống kê tỷ lệ giữa tiền mặt – hiện vật – hoạt động gây quỹ
                    </h4>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap">
                        {selectedData.items.map((item) => (
                            <div
                                key={item.name}
                                className="bg-white rounded-xl shadow-sm px-6 py-3 text-center min-w-[120px] max-w-full flex-1 sm:flex-none"
                            >
                                <div className="text-gray-500 text-sm truncate">{item.name}</div>
                                <div className="text-xl font-bold text-[#355C7D] mt-1">
                                    {(item.value || 0).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SummarySection;
