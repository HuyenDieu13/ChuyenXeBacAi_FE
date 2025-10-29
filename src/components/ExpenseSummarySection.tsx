import React from "react";

interface ExpenseItem {
    label: string;
    amount: number;
    note?: string; // có thể là link hay ghi chú
}

interface ExpenseSummaryProps {
    incomeItems: ExpenseItem[];
    totalIncome: number;
    totalExpense: number;
    remaining: number;
}

const ExpenseSummarySection: React.FC<ExpenseSummaryProps> = ({

    incomeItems,
    totalIncome,
    totalExpense,
    remaining,
}) => {
    return (
        <section className="w-full flex flex-col items-start mt-12">
            {/* ===== TIÊU ĐỀ ===== */}
            <div className="flex justify-start mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                    Thống kê chi tiêu
                </h2>
            </div>


            {/* ===== BẢNG SỐ LIỆU ===== */}
            <div className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-gray-700">
                    <tbody>
                        {incomeItems.map((item, index) => (
                            <tr key={index} className="border-b border-gray-100">
                                <td className="px-6 py-3 text-sm sm:text-base">
                                    ({index + 1}) {item.label}
                                </td>
                                <td className="px-6 py-3 text-right font-medium">
                                    {item.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-3 text-right text-blue-500 text-sm">
                                    {item.note || "link"}
                                </td>
                            </tr>
                        ))}

                        <tr className="border-t-2 border-gray-300 font-semibold">
                            <td className="px-6 py-3 text-[#355C7D] uppercase">Tổng thu (1+2+3)</td>
                            <td className="px-6 py-3 text-right text-[#355C7D] font-bold">
                                {totalIncome.toLocaleString()}
                            </td>
                            <td className="px-6 py-3 text-right text-blue-500 text-sm">link</td>
                        </tr>

                        <tr className="font-semibold">
                            <td className="px-6 py-3 uppercase">Tổng chi</td>
                            <td className="px-6 py-3 text-right text-red-500 font-bold">
                                {totalExpense.toLocaleString()}
                            </td>
                            <td></td>
                        </tr>

                        <tr className="font-semibold">
                            <td className="px-6 py-3 uppercase">Quỹ tồn</td>
                            <td className="px-6 py-3 text-right text-green-600 font-bold">
                                {remaining.toLocaleString()}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ExpenseSummarySection;
