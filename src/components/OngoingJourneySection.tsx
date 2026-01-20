import React, { useEffect, useState } from "react";

interface JourneyItem {
  id: number;
  title: string;
  cards: {
    headline: string;
    img: string;
    description: string;
    hours?: number;
    minutes?: number;
    seconds?: number;
    totalFund?: number;
  }[];
}

interface OngoingJourneySectionProps {
  data: JourneyItem[];
  title?: string;
}

const OngoingJourneySection: React.FC<OngoingJourneySectionProps> = ({ data, title = "Hành Trình Đang Diễn Ra" }) => {
  const [activeId, setActiveId] = useState<number | null>(data[0]?.id || null);
  const [countdowns, setCountdowns] = useState<Record<string, { hours: number; minutes: number; seconds: number }>>({});
  const [funds, setFunds] = useState<Record<string, number>>({});

  // Khởi tạo dữ liệu thời gian và quỹ
  useEffect(() => {
    const initialCountdowns: Record<string, { hours: number; minutes: number; seconds: number }> = {};
    const initialFunds: Record<string, number> = {};

    data.forEach((item) =>
      item.cards.forEach((card, i) => {
        const key = `${item.id}-${i}`;
        initialCountdowns[key] = {
          hours: card.hours ?? 0,
          minutes: card.minutes ?? 0,
          seconds: card.seconds ?? 0,
        };
        initialFunds[key] = 0;
      })
    );

    setCountdowns(initialCountdowns);
    setFunds(initialFunds);
  }, [data]);

  // Đếm ngược thời gian
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

  useEffect(() => {
    const duration = 1500;
    const step = 20;
    const interval = setInterval(() => {
      setFunds((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          const target = 90000000 + Math.floor(Math.random() * 8000000); // random cho đẹp
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
    <section className="w-full bg-[#F9FEFF] py-16 flex justify-center">
      <div className="w-full max-w-[1200px] px-6">
        {/* ===== Title ===== */}
        <div className="flex justify-start mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
            {title}
          </h2>
        </div>

        {/* ===== Accordion ===== */}
        <div className="flex flex-col gap-6">
          {data.map((item) => (
            <div key={item.id} className="w-full">
              {/* Header */}
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className={`w-full flex items-center justify-start gap-3 text-lg font-semibold py-3 transition ${activeId === item.id
                    ? "text-yellow-600"
                    : "text-gray-700 hover:text-yellow-500"
                  }`}
              >
                <span
                  className={`w-6 h-6 flex justify-center items-center rounded-full border-2 ${activeId === item.id
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
                className={`transition-all duration-700 ease-in-out overflow-hidden ${activeId === item.id
                    ? "max-h-[1200px] opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                {activeId === item.id && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.cards.map((card, i) => {
                      const key = `${item.id}-${i}`;
                      const fund = funds[key] || 0;

                      return (
                        <div
                          key={i}
                          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                        >
                          <img
                            src={card.img}
                            alt={card.headline}
                            className="w-full h-48 object-cover"
                          />
                          <div className="flex flex-col justify-between p-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {card.headline}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {card.description}
                              </p>
                              

                              {/* Quỹ quyên góp */}
                              <div className="bg-[#FFF8E1] border border-[#FFB800]/40 rounded-lg text-center py-2">
                                <p className="text-sm text-[#355C7D] font-medium">
                                  Số tiền quyên góp được
                                </p>
                                <p className="text-lg font-bold text-[#FFB800]">
                                  {new Intl.NumberFormat("vi-VN").format(fund)} VNĐ
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingJourneySection;
