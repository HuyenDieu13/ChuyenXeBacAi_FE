import React, { useEffect, useState } from "react";
import {
  Award,
  Activity,
  CalendarCheck,
  Heart,
  BarChart2,
} from "lucide-react";

/** Mock data TNV cá nhân */
interface ActivityLog {
  id: string;
  campaign: string;
  session: string;
  date: string;
  status: "CHECKED_IN" | "DONE";
}

const mockStats = {
  totalCampaigns: 4,
  totalSessions: 10,
  totalCompletedTasks: 7,
  rating: 4.8,
  activities: [
    {
      id: "a1",
      campaign: "Trung Thu Ấm Áp",
      session: "Buổi sáng 06/11/2025",
      date: "2025-11-06",
      status: "DONE",
    },
    {
      id: "a2",
      campaign: "Tết Yêu Thương 2025",
      session: "Chiều 10/02/2025",
      date: "2025-02-10",
      status: "DONE",
    },
    {
      id: "a3",
      campaign: "Trao Sách Cho Em",
      session: "Sáng 12/04/2025",
      date: "2025-04-12",
      status: "CHECKED_IN",
    },
  ] as ActivityLog[],
};

const MyStatsPage: React.FC = () => {
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const percentDone = Math.round(
    (stats.totalCompletedTasks / stats.totalSessions) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6F1FF] via-[#F8FAFF] to-white pb-16">
      {/* Header Section */}
      <section className="text-center py-10 bg-gradient-to-r from-[#4A90E2] via-[#355C7D] to-[#4A90E2] text-white shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Bảng Thành Tích Của Tôi
        </h1>
        <p className="text-blue-100">
          Theo dõi hành trình thiện nguyện và đóng góp của bạn ❤️
        </p>
      </section>

      {/* Statistic Cards */}
      <div className="max-w-6xl mx-auto mt-10 px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center border-t-4 border-[#355C7D]">
          <Heart className="text-[#355C7D] mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalCampaigns}
          </p>
          <p className="text-gray-600 text-sm">Chiến dịch đã tham gia</p>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center border-t-4 border-[#4A90E2]">
          <CalendarCheck className="text-[#4A90E2] mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalSessions}
          </p>
          <p className="text-gray-600 text-sm">Buổi đã điểm danh</p>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center border-t-4 border-[#FFD166]">
          <Award className="text-[#FFD166] mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalCompletedTasks}
          </p>
          <p className="text-gray-600 text-sm">Nhiệm vụ hoàn thành</p>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center border-t-4 border-[#2ECC71]">
          <Activity className="text-[#2ECC71] mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">{stats.rating}</p>
          <p className="text-gray-600 text-sm">Điểm đánh giá trung bình</p>
        </div>
      </div>

      {/* Circular Chart */}
      <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-lg p-10 text-center border border-gray-100">
        <h3 className="text-xl font-semibold text-[#355C7D] flex justify-center items-center gap-2">
          <BarChart2 size={20} /> Mức độ hoàn thành
        </h3>
        <div className="relative w-40 h-40 mx-auto mt-6">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="#355C7D"
              strokeWidth="3"
              strokeDasharray={`${percentDone}, 100`}
            />
            <text
              x="18"
              y="20.35"
              className="text-sm font-bold fill-[#355C7D]"
              textAnchor="middle"
            >
              {percentDone}%
            </text>
          </svg>
          <p className="mt-3 text-gray-600 text-sm">
            Hoàn thành {stats.totalCompletedTasks}/{stats.totalSessions} nhiệm vụ
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="max-w-5xl mx-auto mt-14 px-4">
        <h3 className="text-xl font-semibold text-[#355C7D] mb-4 text-center">
          Lịch Sử Hoạt Động Của Tôi
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
            <thead className="bg-[#355C7D] text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">Chiến dịch</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Buổi</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Ngày</th>
                <th className="py-3 px-4 text-center text-sm font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {stats.activities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b hover:bg-[#F8FAFF] transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">{a.campaign}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{a.session}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{a.date}</td>
                  <td className="py-3 px-4 text-center text-sm">
                    {a.status === "DONE" ? (
                      <span className="bg-[#2ECC71]/20 text-[#2ECC71] px-3 py-1 rounded-full text-xs font-medium">
                        Hoàn thành
                      </span>
                    ) : (
                      <span className="bg-[#FFD166]/20 text-[#C18700] px-3 py-1 rounded-full text-xs font-medium">
                        Đã điểm danh
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Thank You */}
      <div className="text-center mt-10 text-gray-600 text-sm italic">
        Cảm ơn bạn đã đồng hành cùng <span className="text-[#355C7D] font-semibold">Chuyến Xe Bác Ái</span> ❤️
      </div>
    </div>
  );
};

export default MyStatsPage;
