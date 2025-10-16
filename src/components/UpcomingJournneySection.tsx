import React, { useState } from "react";

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

    return (
        <section className="w-full bg-[#E8F9FD] py-16 flex justify-center">
            <div className="w-full max-w-[1200px]">
                {/* Tiêu đề */}
                <div className="flex justify-start mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                        Hành Trình Sắp Diễn Ra
                    </h2>
                </div>

                {/* Danh sách kỳ */}
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
                                className={`transition-all duration-500 overflow-auto ${activeId === item.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                {activeId === item.id && (
                                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {item.cards.map((card, i) => (
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
                                                <div className="flex flex-col justify-between items-center">
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        Dự án sắp diễn ra
                                                    </p>
                                                    <p className="text-yellow-500 font-bold text-lg mb-4">
                                                        Thời gian còn lại
                                                    </p>
                                                    <div className="flex justify-between text-center gap-6 mb-4">
                                                        <div>
                                                            <p className="text-xl font-bold text-sky-500">
                                                                {card.hours}
                                                            </p>
                                                            <p className="text-xs text-gray-500">GIỜ</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold text-sky-500">
                                                                {card.minutes}
                                                            </p>
                                                            <p className="text-xs text-gray-500">PHÚT</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold text-sky-500">
                                                                {card.seconds}
                                                            </p>
                                                            <p className="text-xs text-gray-500">GIÂY</p>
                                                        </div>
                                                    </div>
                                                    <span className="border-t-2 w-full mb-4"></span>
                                                        <p className="text-sm text-gray-600">
                                                            {card.description}
                                                        </p>
                                                </div>
                                            </div>
                                        ))}
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
