import React, { useState } from "react";

interface JourneyItem {
  id: number;
  title: string;
  cards: {
    headline: string;
    img: string;
    description: string;
  }[];
}

interface OngoingJourneySectionProps {
  data: JourneyItem[];
}

const OngoingJourneySection: React.FC<OngoingJourneySectionProps> = ({ data }) => {
  const [activeId, setActiveId] = useState<number | null>(data[0]?.id || null);

  return (
    <section className="w-full bg-[#F9FEFF] py-16 flex justify-center">
      <div className="w-full max-w-[1200px] px-6">
        {/* ===== Title ===== */}
        <div className="flex justify-start mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
            Hành Trình Đang Diễn Ra
          </h2>
        </div>

        {/* ===== Accordion ===== */}
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
                className={`transition-all duration-500 overflow-hidden ${
                  activeId === item.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {activeId === item.id && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {item.cards.map((card, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl grid grid-cols-2"
                      >
                        <img
                          src={card.img}
                          alt={card.headline}
                          className="w-full h-56 object-cover"
                        />
                        <div className="flex flex-col justify-between p-4 flex-1">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {card.headline}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {card.description}
                            </p>
                          </div>
                          <button className="mt-4 bg-sky-400 hover:bg-sky-500 text-white text-sm px-4 py-2 rounded-md transition self-start">
                            See more
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Line separator */}
              <div className="mt-6 border-b border-gray-300 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingJourneySection;
