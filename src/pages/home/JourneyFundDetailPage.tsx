import React from "react";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import ContributionTable from "@/components/ContributionTable";
import SummarySection from "@/components/SummarySection";
import ExpenseSummarySection from "@/components/ExpenseSummarySection";
import CustomSwiper from "@/components/SwiperComponent";
import bannerImg from "@/assets/images/Home/banner.png";
import SideCard from "@/components/SideCard";
import { MdPerson } from "react-icons/md"
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
const JourneyFundDetailPage: React.FC = () => {
    const dataBanner = {
        title: "Quỹ hành trình",
        content: "Nơi yêu thương được san sẻ – cùng nhau vun đắp từng chuyến xe.",
        buttonText: "Xem hành trình gây quỹ",
    };
    const sideNews = [
        {
            id: 1,
            title: "Chuyến xe bác ái kỳ 10",
            content: "Chuyến xe mang yêu thương đến vùng cao...",
            imgUrl: bannerImg,
            createAt: "2 giờ trước",
            createdBy: "By Lucy Hiddleston",
        },
        {
            id: 2,
            title: "Chuyến xe bác ái kỳ 11",
            content: "Tặng quà trung thu cho trẻ em khó khăn...",
            imgUrl: bannerImg,
            createAt: "4 giờ trước",
            createdBy: "By Caroline Casey",
        },
        {
            id: 3,
            title: "Chuyến xe bác ái kỳ 12",
            content: "Cùng nhau sửa sang lớp học vùng sâu...",
            imgUrl: bannerImg,
            createAt: "5 giờ trước",
            createdBy: "By Lucy Hiddleston",
        },
    ];
    const fundData = [
        {
            period: "Tháng 10 / 2025",
            items: [
                { name: "Tiền mặt", value: 500, color: "#3B82F6" },
                { name: "Hiện vật", value: 150, color: "#93C5FD" },
                { name: "Hoạt động", value: 100, color: "#CBD5E1" },
            ],
        },
        {
            period: "Tháng 9 / 2025",
            items: [
                { name: "Tiền mặt", value: 420, color: "#3B82F6" },
                { name: "Hiện vật", value: 120, color: "#93C5FD" },
                { name: "Hoạt động", value: 80, color: "#CBD5E1" },
            ],
        },
    ];
    const expenseData = [
        { label: "Tổng tiền quyên góp CXBA11", amount: 90255847, note: "link" },
        { label: "Lợi nhuận bán bánh", amount: 6780000, note: "link" },
        { label: "Quỹ tồn CXBA10", amount: 1118543, note: "link" },
    ];

    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col items-center overflow-x-hidden scroll-smooth">
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />

            <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
                <BreadcrumbRibbon label="Quỹ hành trình" detailLabel="Chi tiết" className="mb-4" />
            </div>

            <section className="w-full flex justify-center bg-whit py-10 px-4 sm:px-8">
                {/* Layout 2/3 - 1/3 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                    <div className="lg:col-span-2 grid grid-cols-1 border-r-2 gap-6 font-body">
                        <div className="flex flex-col px-4">
                            <div className="flex justify-start font-medium text-[#355C7D] gap-4">
                                <div className="flex items-center gap-2">
                                    <MdPerson className="w-5 h-5" />
                                    <p className="text-base">Author</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="w-5 h-5" />
                                    <p className="text-base">12 Sep 2021</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRegClock className="w-5 h-5" />
                                    <p className="text-base">10 min read</p>
                                </div>
                            </div>
                            <h2 className="text-3xl mt-6 line-clamp">Tổng kết hành trình chuyến xe Bác Ái tại Ninh Thuận</h2>
                            <div className="flex justify-start gap-6 mt-6 items-center bg-[#E2F9FF] text-[#355C7D] font-medium p-4">
                                <p>Thời gian tổ chức: 2 - 12 sep 2021</p>
                                <p>Địa điểm: Ninh Thuận</p>
                            </div>
                            <p className="my-4">Một chuyến đi rất đáng nhớ bởi cái nắng khắc nghiệt đúng như truyền thuyết “gió như phang, nắng như rang” tại vùng đất Ninh Thuận. Những gương mặt đỏ bừng bỏng rát, cơ thể cạn kiệt năng lượng bởi cái nắng nóng cháy da cháy thịt. Lời động viên lẫn nhau “ráng lên tí nữa” được lặp lại khoảng 188 lần để biệt đội “chiếc xe bát nháo” cùng nhau thực hiện gần như trọn vẹn kế hoạch.</p>
                            <ContributionTable />
                            <SummarySection dataOptions={fundData} />
                            <ExpenseSummarySection
                                incomeItems={expenseData}
                                totalIncome={98154390}
                                totalExpense={90577800}
                                remaining={7576690}
                            />
                            <div className="flex flex-col space-y-4 mt-6">
                                <h2 className="text-xl font-medium text-[#355C7D]">TIN KHÁC:</h2>

                                <CustomSwiper
                                    items={sideNews}
                                    slidesPerView={2}
                                    breakpoints={{
                                        640: { slidesPerView: 1},
                                        1024: { slidesPerView: 2 },
                                    }}
                                    navId="tin-khac"
                                    renderSlide={(item) => (
                                        <div className="px-2">
                                            <SideCard
                                                key={item.id}
                                                title={item.title}
                                                content={item.content}
                                                imgUrl={item.imgUrl}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    {/* ==== Bên phải: Danh sách tin nhỏ ==== */}
                    <div className="space-y-5">
                        <div className="flex justify-start mb-8">
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                                Tin Nổi Bật
                            </h2>
                        </div>

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
            </section>
        </div>
    );
};

export default JourneyFundDetailPage;
