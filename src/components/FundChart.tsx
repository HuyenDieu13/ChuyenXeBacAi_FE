import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FundChartProps {
  data: { month: string; value: number }[];
  title?: string;
}

const FundChart: React.FC<FundChartProps> = ({ data, title }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#999", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            formatter={(value: number) => [`${value.toLocaleString()} VND`, "Tổng thu"]}
          />
          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            barSize={20}
            fill="url(#colorGradient)"
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundChart;
