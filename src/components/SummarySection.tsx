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
    // chọn kỳ đầu tiên làm mặc định
    const selectedData = dataOptions[0];

    const total = selectedData.items.reduce((sum, i) => sum + i.value, 0);

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
                <div className="flex bg-white border rounded-lg shadow-lg gap-4 p-4">
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-gray-700 text-base font-medium mb-2">Tổng thu được</h3>
                        <div className="text-4xl font-extrabold text-[#355C7D] mb-3">
                            {total.toLocaleString()}
                        </div>

                        {selectedData.items.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                {item.name}
                            </div>
                        ))}
                    </div>

                    {/* Biểu đồ */}
                    <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={selectedData.items as any}
                                    dataKey="value"
                                    innerRadius={45}
                                    outerRadius={70}
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
                <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-auto">
                    <h4 className="text-[#355C7D] text-base font-semibold">
                        Thống kê tỷ lệ giữa tiền mặt – hiện vật – hoạt động gây quỹ
                    </h4>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {selectedData.items.map((item) => (
                            <div
                                key={item.name}
                                className="bg-white rounded-xl shadow-sm px-6 py-3 text-center min-w-[100px]"
                            >
                                <div className="text-gray-500 text-sm">{item.name}</div>
                                <div className="text-xl font-bold text-[#355C7D] mt-1">
                                    {item.value.toLocaleString()}
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
