import React, { useEffect, useState } from "react";

interface JourneyItem {
  id: number;
  title: string;
  cards: {
    headline: string;
    img: string;
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
  }[];
}

interface UpcomingJourneySectionProps {
  data: JourneyItem[];
}

const UpcomingJourneySection: React.FC<UpcomingJourneySectionProps> = ({ data }) => {
  const [activeId, setActiveId] = useState<number | null>(data[0]?.id || null);
  const [countdowns, setCountdowns] = useState<Record<string, { hours: number; minutes: number; seconds: number }>>({});
  const [funds, setFunds] = useState<Record<string, number>>({});

  // 🔹 Khởi tạo state countdown và fund
  useEffect(() => {
    const initCountdowns: Record<string, { hours: number; minutes: number; seconds: number }> = {};
    const initFunds: Record<string, number> = {};
    data.forEach((item) =>
      item.cards.forEach((card, i) => {
        const key = `${item.id}-${i}`;
        initCountdowns[key] = { hours: card.hours, minutes: card.minutes, seconds: card.seconds };
        initFunds[key] = 0;
      })
    );
    setCountdowns(initCountdowns);
    setFunds(initFunds);
  }, [data]);

  // 🔹 Countdown động
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          let { hours, minutes, seconds } = updated[key];
          if (seconds > 0) seconds--;
          else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
          updated[key] = { hours, minutes, seconds };
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Hiệu ứng tăng tiền quyên góp
  useEffect(() => {
    const duration = 1500;
    const step = 20;
    const interval = setInterval(() => {
      setFunds((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          const target = 80000000 + Math.floor(Math.random() * 10000000);
          if (updated[key] < target) {
            updated[key] = Math.min(updated[key] + target / (duration / step), target);
          }
        }
        return updated;
      });
    }, step);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#E8F9FD] py-16 flex justify-center">
      <div className="w-full max-w-[1200px] px-4">
        {/* ===== Tiêu đề ===== */}
        <div className="flex justify-start mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
            Hành Trình Sắp Diễn Ra
          </h2>
        </div>

        {/* ===== Danh sách kỳ ===== */}
        <div className="flex flex-col gap-6">
          {data.map((item) => (
            <div key={item.id} className="w-full">
              {/* Header */}
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className={`w-full flex items-center justify-start gap-3 text-lg font-semibold py-3 transition ${
                  activeId === item.id
                    ? "text-yellow-600"
                    : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                <span
                  className={`w-6 h-6 flex justify-center items-center rounded-full border-2 ${
                    activeId === item.id
                      ? "bg-yellow-400 border-yellow-400 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {item.id}
                </span>
                {item.title}
              </button>

              {/* Nội dung mở rộng */}
              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  activeId === item.id
                    ? "max-h-[1200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {activeId === item.id && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {item.cards.map((card, i) => {
                      const key = `${item.id}-${i}`;
                      const countdown = countdowns[key] || {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                      };
                      const fund = funds[key] || 0;

                      return (
                        <div
                          key={i}
                          className="bg-white rounded-2xl p-4 shadow-md overflow-hidden transition hover:shadow-xl"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {card.headline}
                          </h3>
                          <img
                            src={card.img}
                            alt={card.headline}
                            className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200"
                          />
                          <div className="flex flex-col items-center text-center">
                            <p className="text-sm text-gray-600 mb-3">
                              Dự án sắp diễn ra
                            </p>
                            <p className="text-yellow-500 font-bold text-lg mb-2">
                              Thời gian còn lại
                            </p>

                            {/* Countdown động */}
                            <div className="flex justify-center text-center gap-6 mb-3">
                              <div>
                                <p className="text-xl font-bold text-sky-500">
                                  {countdown.hours.toString().padStart(2, "0")}
                                </p>
                                <p className="text-xs text-gray-500">GIỜ</p>
                              </div>
                              <div>
                                <p className="text-xl font-bold text-sky-500">
                                  {countdown.minutes.toString().padStart(2, "0")}
                                </p>
                                <p className="text-xs text-gray-500">PHÚT</p>
                              </div>
                              <div>
                                <p className="text-xl font-bold text-sky-500">
                                  {countdown.seconds.toString().padStart(2, "0")}
                                </p>
                                <p className="text-xs text-gray-500">GIÂY</p>
                              </div>
                            </div>

                            {/* Hiển thị quỹ quyên góp */}
                            <div className="bg-[#FFF8E1] border border-[#FFB800]/40 rounded-lg text-center py-2 w-full mb-3">
                              <p className="text-sm text-[#355C7D] font-medium">
                                Số tiền quyên góp được
                              </p>
                              <p className="text-lg font-bold text-[#FFB800]">
                                {new Intl.NumberFormat("vi-VN").format(fund)} VNĐ
                              </p>
                            </div>

                            {/* Mô tả */}
                            <p className="text-sm text-gray-600 mb-3 px-2">
                              {card.description}
                            </p>

                            <button className="mt-2 bg-sky-400 hover:bg-sky-500 text-white text-sm px-5 py-2 rounded-md transition">
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Đường kẻ ngăn cách */}
              <div className="mt-6 border-b border-gray-300 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingJourneySection;
