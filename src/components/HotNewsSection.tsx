import React from "react";
import { useNavigate } from "@tanstack/react-router";
import MainCard from "./MainCard";
import SideCard from "./SideCard";

interface HotNewsItem {
    id: number;
    title: string;
    content: string;
    imgUrl?: string;
    createAt?: string;
    createdBy?: string;
}

interface HotNewsSectionProps {
    newsItems: HotNewsItem[];
}

const HotNewsSection: React.FC<HotNewsSectionProps> = ({ newsItems }) => {
    // 4 tin đầu tiên (mới nhất)
    const mainNews = newsItems.slice(0, 4);
    // Phần tin phụ
    const sideNews = newsItems.slice(4);
    const navigate = useNavigate();
    return (
        <section className="w-full bg-white py-16 flex justify-center">
            <div className="w-full px-4">
                {/* Tiêu đề */}
                <div className="flex justify-start mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                        Tin Nổi Bật
                    </h2>
                </div>

                {/* Layout 2/3 - 1/3 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ==== Bên trái: Tin chính ==== */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {mainNews.map((item) => (
                            <MainCard
                                key={item.id}
                                title={item.title}
                                content={item.content}
                                imgUrl={item.imgUrl}
                                createAt={item.createAt}
                                createdBy={item.createdBy}
                                onClick={() => navigate({ to: `fundDetail` })}
                            />
                        ))}
                    </div>

                    {/* ==== Bên phải: Danh sách tin nhỏ ==== */}
                    <div className="space-y-5">
                        <h3 className="text-xl font-semibold text-[#355C7D] border-b-2 border-yellow-400 pb-2 inline-block">
                            Tin Gần Đây
                        </h3>

                        {sideNews.length > 0 ? (
                            sideNews.map((item) => (
                                <SideCard
                                    key={item.id}
                                    title={item.title}
                                    content={item.content}
                                    imgUrl={item.imgUrl}
                                    className="border-b-2"
                                    onClick={() => navigate({ to: `fundDetail` })}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                Chưa có thêm tin mới.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotNewsSection;
