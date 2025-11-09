import React, { useEffect, useState } from "react";
import {
  Award,
  Activity,
  CalendarCheck,
  Heart,
  BarChart2,
} from "lucide-react";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";

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

  const dataBanner = {
    title: "Bảng Thành Tích Của Tôi",
    content:
      "Theo dõi hành trình thiện nguyện, điểm danh và nhiệm vụ bạn đã hoàn thành trong suốt quá trình đồng hành cùng Chuyến Xe Bác Ái.",
    buttonText: "Xem chiến dịch khác",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-white pb-16">
      {/* Banner */}
      <BannerCustomComponent
        title={dataBanner.title}
        content={dataBanner.content}
        buttonText={dataBanner.buttonText}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl w-full px-6 mt-6">
        <div className="flex items-center gap-3">
          <BreadcrumbRibbon label="Bảng thành tích cá nhân" />
        </div>
      </div>

      {/* Stats cards */}
      <section className="max-w-6xl mx-auto mt-10 px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 text-center">
          <Heart className="text-yellow-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalCampaigns}
          </p>
          <p className="text-gray-600 text-sm">Chiến dịch đã tham gia</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 text-center">
          <CalendarCheck className="text-yellow-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalSessions}
          </p>
          <p className="text-gray-600 text-sm">Buổi đã điểm danh</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 text-center">
          <Award className="text-yellow-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalCompletedTasks}
          </p>
          <p className="text-gray-600 text-sm">Nhiệm vụ hoàn thành</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 text-center">
          <Activity className="text-yellow-500 mb-2" size={28} />
          <p className="text-3xl font-bold text-gray-800">{stats.rating}</p>
          <p className="text-gray-600 text-sm">Điểm đánh giá trung bình</p>
        </div>
      </section>

      {/* Circular completion chart */}
      <section className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-md p-10 text-center border border-yellow-100">
        <h3 className="text-xl font-semibold text-yellow-600 flex justify-center items-center gap-2">
          <BarChart2 size={20} /> Mức độ hoàn thành
        </h3>
        <div className="relative w-40 h-40 mx-auto mt-6">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#EAEAEA"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="#FACC15"
              strokeWidth="3"
              strokeDasharray={`${percentDone}, 100`}
              strokeLinecap="round"
            />
            <text
              x="18"
              y="20.35"
              className="text-sm font-bold fill-[#CA8A04]"
              textAnchor="middle"
            >
              {percentDone}%
            </text>
          </svg>
          <p className="mt-3 text-gray-600 text-sm">
            Hoàn thành {stats.totalCompletedTasks}/{stats.totalSessions} nhiệm vụ
          </p>
        </div>
      </section>

      {/* Activity History */}
      <section className="max-w-5xl mx-auto mt-14 px-6">
        <h3 className="text-xl font-semibold text-yellow-600 mb-4 text-center">
          Lịch sử hoạt động thiện nguyện
        </h3>
        <div className="overflow-x-auto rounded-2xl shadow-md border border-yellow-100 bg-white">
          <table className="min-w-full">
            <thead className="bg-yellow-400 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Chiến dịch
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">Buổi</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Ngày</th>
                <th className="py-3 px-4 text-center text-sm font-medium">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.activities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gray-100 hover:bg-yellow-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {a.campaign}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {a.session}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{a.date}</td>
                  <td className="py-3 px-4 text-center text-sm">
                    {a.status === "DONE" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Hoàn thành
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        Đã điểm danh
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Thank You */}
      <div className="text-center mt-10 text-gray-600 text-sm italic">
        Cảm ơn bạn đã đồng hành cùng{" "}
        <span className="text-yellow-600 font-semibold">Chuyến Xe Bác Ái</span> 💛
      </div>
    </div>
  );
};

export default MyStatsPage;
