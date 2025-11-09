import React from "react";
import {
  Users,
  HandHeart,
  Route,
  Coins,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage: React.FC = () => {
  // Mock data cho thống kê donate theo tháng
  const donationData = [
    { month: "01", amount: 12000000 },
    { month: "02", amount: 9500000 },
    { month: "03", amount: 16000000 },
    { month: "04", amount: 10500000 },
    { month: "05", amount: 22000000 },
    { month: "06", amount: 18000000 },
  ];

  // Mock danh sách hành trình gần đây
  const recentJourneys = [
    {
      name: "Chuyến xe miền Trung",
      date: "12/10/2025",
      volunteers: 28,
      fund: "15.500.000 VNĐ",
    },
    {
      name: "Chuyến xe yêu thương lần 8",
      date: "20/09/2025",
      volunteers: 32,
      fund: "21.000.000 VNĐ",
    },
    {
      name: "Tết sẻ chia 2025",
      date: "05/02/2025",
      volunteers: 54,
      fund: "35.800.000 VNĐ",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <h1 className="text-[22px] font-bold text-[#355C7D] mb-6">
        Tổng quan hệ thống
      </h1>

      {/* STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            label: "Tổng tình nguyện viên",
            value: "248",
            icon: <Users size={28} />,
            color: "bg-[#355C7D]",
          },
          {
            label: "Số hành trình đã thực hiện",
            value: "12",
            icon: <Route size={28} />,
            color: "bg-[#5C7AEA]",
          },
          {
            label: "Tổng số tiền quyên góp",
            value: "215.000.000 VNĐ",
            icon: <Coins size={28} />,
            color: "bg-[#FFD166]",
          },
          {
            label: "Chiến dịch đang diễn ra",
            value: "3",
            icon: <HandHeart size={28} />,
            color: "bg-[#F28482]",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 border border-gray-100"
          >
            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center text-white ${card.color}`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-semibold text-[#355C7D]">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* DONATION CHART */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3 flex items-center gap-2">
          <Coins size={20} /> Biểu đồ quyên góp theo tháng
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={donationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              formatter={(v: number) =>
                v.toLocaleString("vi-VN") + " VNĐ"
              }
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#FFD166"
              strokeWidth={3}
              dot={{ fill: "#355C7D" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT JOURNEYS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3 flex items-center gap-2">
          <Calendar size={20} /> Hành trình gần đây
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-2">Tên hành trình</th>
              <th className="pb-2">Ngày diễn ra</th>
              <th className="pb-2">Tình nguyện viên</th>
              <th className="pb-2">Quỹ quyên góp</th>
            </tr>
          </thead>
          <tbody>
            {recentJourneys.map((j, idx) => (
              <tr
                key={idx}
                className="border-b last:border-none hover:bg-gray-50 text-sm"
              >
                <td className="py-3 font-medium text-[#355C7D]">{j.name}</td>
                <td className="py-3">{j.date}</td>
                <td className="py-3">{j.volunteers}</td>
                <td className="py-3 text-[#355C7D] font-semibold">{j.fund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
