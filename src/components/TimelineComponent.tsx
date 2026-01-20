import React from "react";
import { CampaignStatus } from "@/enum/status.enum";

interface TimelineItem {
  id: number | string;
  title: string;
  content?: string;
  // legacy `date` or new `dateLabel`
  date?: string;
  dateLabel?: string;
  color?: string; // ví dụ: "#355C7D" hoặc "#F39C12"
  status?: CampaignStatus | string;
}

interface TimelineProps {
  data: TimelineItem[];
}

const TimelineComponent: React.FC<TimelineProps> = ({ data }) => {
  return (
    <section className="w-full flex justify-center py-20 bg-[url('/bg-texture.png')] bg-cover bg-center">
      <div className="w-full max-w-[1000px] relative">
        {/* Đường dọc chính */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-300 transform -translate-x-1/2"></div>

        {/* Các mục timeline */}
        <div className="flex flex-col gap-16 relative z-10">
          {data.map((item, index) => {
            const isLeft = index % 2 === 0; // xen kẽ trái - phải
            const statusLabel =
              item.status === CampaignStatus.ONGOING
                ? "Hành trình diễn ra"
                : item.status === CampaignStatus.DONE
                  ? "Đã diễn ra"
                  : item.status === CampaignStatus.PLANNING
                    ? "Đang lên kế hoạch"
                    : undefined;
            const badgeColor = item.color ?? (item.status === CampaignStatus.ONGOING ? "#F39C12" : "#355C7D");
            return (
              <div
                key={item.id}
                className={`flex w-full justify-between items-center ${isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
              >
                {/* Nội dung */}
                <div
                  className={`w-[45%] ${isLeft ? "text-right" : "text-left"
                    } space-y-2`}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  {item.content && <p className="text-sm text-gray-600">{item.content}</p>}
                  {statusLabel && (
                    <div className="mt-1 inline-block">
                      <span
                        className="text-white px-3 py-1 rounded-full text-xs font-medium shadow-md"
                        style={{ backgroundColor: badgeColor }}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Vòng tròn giữa */}
                <div className="relative flex justify-center items-center">
                  <div className="w-4 h-4 bg-white border-4 border-[#355C7D] rounded-full z-10"></div>
                </div>

                {/* Ô ngày */}
                <div className={`w-[45%] flex ${isLeft ? "justify-start" : "justify-end"} items-center`}>
                  <span
                    className="text-white px-6 py-2 rounded-full text-sm font-medium shadow-md"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {item.dateLabel ?? item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineComponent;
