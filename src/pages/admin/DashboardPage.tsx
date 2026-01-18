import React, { useMemo, useState } from "react";
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  useGetStats,
  useGetCashflowTrend,
  useGetCampaignAlert,
  useGetFinancialPerformance,
  useGetVolunteerFunnel,
  useGetApplicationStatusTrend,
  useGetDemographics,
} from "@/hooks/dashboard.hook";
import { parseDateVN } from "@/helpers/date";
import dayjs from "dayjs";

const DashboardPage: React.FC = () => {
  // Filters
  const [range, setRange] = useState<string>("30d");
  // store dates as yyyy-mm-dd to work with native date input (shows calendar)
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  // Hooks to fetch dashboard data
  const { data: statsData, isLoading: statsLoading } = useGetStats();
  const {
    data: cashflowData,
    isLoading: cashflowLoading,
  } = useGetCashflowTrend(range);
  // helper: convert dd/MM/yyyy -> YYYY-MM-DDT00:00:00Z
  const toIsoZ = (vnDate: string): string | undefined => {
    // Try strict VN parse first (dd/MM/YYYY)
    let ymd = parseDateVN(vnDate); // returns YYYY-MM-DD or ""
    if (!ymd) {
      // Try loose parsing with dayjs to accept other common inputs
      const alt = dayjs(vnDate);
      if (alt.isValid()) {
        ymd = alt.format("YYYY-MM-DD");
      }
    }
    return ymd ? `${ymd}T00:00:00Z` : undefined;
  };

  // derive ISO strings to pass to hooks that expect start/end as strings
  const startIso = useMemo<string | undefined>(() => toIsoZ(startDate), [startDate]);
  const endIso = useMemo<string | undefined>(() => toIsoZ(endDate), [endDate]);

  const {
    data: financialPerformanceData,
    isLoading: financialPerformanceLoading,
  } = useGetFinancialPerformance(startIso, endIso);
  const {
    data: volunteerFunnelData,
    isLoading: volunteerFunnelLoading,
  } = useGetVolunteerFunnel(startIso, endIso);
  const {
    data: applicationStatusTrendData,
    isLoading: applicationStatusTrendLoading,
  } = useGetApplicationStatusTrend(range);
  const { data: demographicsData, isLoading: demographicsLoading } = useGetDemographics();
  const { data: campaignAlertData, isLoading: campaignAlertLoading } =
    useGetCampaignAlert();

  // Map cashflow response to chart friendly format
  const donationData = useMemo(() => {
    if (!cashflowData) return [];
    return cashflowData.map((d) => ({
      month: d.date, // backend returns date string
      amount: d.income ?? 0,
      expense: d.expense ?? 0,
    }));
  }, [cashflowData]);

  // Recent / alerts - use campaign alerts fundRisk if available
  const recentJourneys = useMemo(() => {
    const arr = campaignAlertData?.fundRisk ?? [];
    if (arr && arr.length > 0) {
      return arr.map((c) => ({
        name: c.title,
        date: c.end_date,
        volunteers: "-",
        fund: `${c.progress ?? 0}%`,
      }));
    }
    // fallback empty list
    return [];
  }, [campaignAlertData]);

  // Chart data mapping for volunteer funnel
  const volunteerFunnelChartData = useMemo(() => {
    if (!volunteerFunnelData) return [];
    return volunteerFunnelData.map((v) => ({
      name: v.title,
      applied: v.applied ?? 0,
      approved: v.approved ?? 0,
      attended: v.attended ?? 0,
    }));
  }, [volunteerFunnelData]);

  // Application status trend mapping
  const appStatusChartData = useMemo(() => {
    if (!applicationStatusTrendData) return [];
    return applicationStatusTrendData.map((d) => ({
      date: d.date,
      pending: d.pending ?? 0,
      approved: d.approved ?? 0,
      rejected: d.rejected ?? 0,
    }));
  }, [applicationStatusTrendData]);

  // demographics pies
  const ageGroups = demographicsData?.[0]?.ageGroups ?? [];
  const genderGroups = demographicsData?.[0]?.genderDistribution ?? [];

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
            label: "Tổng số tiền quyên góp",
            value: statsLoading ? "..." : (statsData?.totalRaised ?? 0).toLocaleString("vi-VN") + " VNĐ",
            icon: <Coins size={28} />,
            color: "bg-[#FFD166]",
          },
          {
            label: "Chiến dịch đang diễn ra",
            value: statsLoading ? "..." : String(statsData?.activeCampaigns ?? "-"),
            icon: <HandHeart size={28} />,
            color: "bg-[#F28482]",
          },
          {
            label: "Tình trạng cần xác minh",
            value: statsLoading ? "..." : String(statsData?.pendingReconcileCount ?? "-"),
            icon: <Route size={28} />,
            color: "bg-[#5C7AEA]",
          },
          {
            label: "Đơn tình nguyện mới",
            value: statsLoading ? "..." : String(statsData?.newVolunteerApplications ?? "-"),
            icon: <Users size={28} />,
            color: "bg-[#355C7D]",
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
              <p className="text-xl font-semibold text-[#355C7D]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DONATION CHART */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#355C7D] flex items-center gap-2">
            <Coins size={20} /> Dòng tiền (Income / Expense)
          </h2>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500">Khoảng thời gian</label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
              <option value="180d">180d</option>
              <option value="365d">365d</option>
            </select>
          </div>
        </div>

        {cashflowLoading ? (
          <div className="py-12 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                formatter={(v: number) =>
                  typeof v === "number"
                    ? v.toLocaleString("vi-VN") + " VNĐ"
                    : v
                }
              />
              <Line
                type="monotone"
                dataKey="amount"
                name="Thu nhập"
                stroke="#FFD166"
                strokeWidth={3}
                dot={{ fill: "#355C7D" }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                name="Chi tiêu"
                stroke="#F28482"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* APPLICATION STATUS TREND */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3">Tình trạng đơn theo thời gian</h2>
        {applicationStatusTrendLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : !appStatusChartData || appStatusChartData.length === 0 ? (
          <div className="py-6 text-sm text-gray-500">Không có dữ liệu.</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={appStatusChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pending" name="Đang chờ" stroke="#F28482" />
              <Line type="monotone" dataKey="approved" name="Đã duyệt" stroke="#355C7D" />
              <Line type="monotone" dataKey="rejected" name="Bị từ chối" stroke="#888" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* START/END FILTERS for hooks that need them */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Từ</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Đến</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* FINANCIAL PERFORMANCE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3">Hiệu suất tài chính</h2>
        {financialPerformanceLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : !financialPerformanceData || financialPerformanceData.length === 0 ? (
          <div className="py-6 text-sm text-gray-500">Không có dữ liệu hiệu suất.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financialPerformanceData.map((f) => (
              <div key={f.id} className="p-4 bg-white rounded border">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-[#355C7D]">{f.title}</div>
                  <div className="text-sm text-gray-500">{f.progressPercent}%</div>
                </div>
                <div className="w-full bg-gray-100 rounded h-3 overflow-hidden">
                  <div
                    className="h-3 bg-[#FFD166]"
                    style={{ width: `${Math.min(100, f.progressPercent)}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>Đã quyên góp: {f.raised?.toLocaleString("vi-VN")}</span>
                  <span>Mục tiêu: {f.goal?.toLocaleString("vi-VN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VOLUNTEER FUNNEL */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3">Phễu tình nguyện viên</h2>
        {volunteerFunnelLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : !volunteerFunnelData || volunteerFunnelData.length === 0 ? (
          <div className="py-6 text-sm text-gray-500">Không có dữ liệu phễu.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volunteerFunnelChartData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="applied" name="Đã đăng ký" fill="#355C7D" />
              <Bar dataKey="approved" name="Đã duyệt" fill="#5C7AEA" />
              <Bar dataKey="attended" name="Đã tham gia" fill="#FFD166" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>


      {/* DEMOGRAPHICS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3">Nhân khẩu học</h2>
        {demographicsLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : (!ageGroups.length && !genderGroups.length) ? (
          <div className="py-6 text-sm text-gray-500">Không có dữ liệu nhân khẩu học.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Nhóm tuổi</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={ageGroups} dataKey="count" nameKey="group" outerRadius={70} fill="#82ca9d">
                    {ageGroups.map((entry, idx) => (
                      <Cell key={`age-${idx}`} fill={["#FFD166", "#355C7D", "#F28482", "#5C7AEA"][idx % 4]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Giới tính</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={genderGroups} dataKey="count" nameKey="gender" outerRadius={70} fill="#8884d8">
                    {genderGroups.map((entry, idx) => (
                      <Cell key={`gender-${idx}`} fill={["#355C7D", "#F28482", "#FFD166"][idx % 3]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* RECENT / ALERTS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#355C7D] mb-3 flex items-center gap-2">
          <Calendar size={20} /> Chiến dịch cảnh báo quỹ
        </h2>
        {campaignAlertLoading ? (
          <div className="py-12 text-center text-gray-500">Đang tải...</div>
        ) : recentJourneys.length === 0 ? (
          <div className="py-6 text-sm text-gray-500">Không có cảnh báo quỹ nào.</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-2">Tên chiến dịch</th>
                <th className="pb-2">Ngày kết thúc</th>
                <th className="pb-2">Tình nguyện viên</th>
                <th className="pb-2">Tiến độ</th>
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
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
