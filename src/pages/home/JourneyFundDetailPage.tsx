import React, { useEffect, useState } from "react";
import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import ContributionTable from "@/components/ContributionTable";
import SummarySection from "@/components/SummarySection";
import ExpenseSummarySection from "@/components/ExpenseSummarySection";
import CustomSwiper from "@/components/SwiperComponent";
import bannerImg from "@/assets/images/Home/banner.png";
import SideCard from "@/components/SideCard";
import { MdPerson } from "react-icons/md";
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

  // ==== 💰 Hiệu ứng tăng dần số tiền ====
  const totalFund = 98154390;
  const [displayFund, setDisplayFund] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 giây
    const stepTime = 15;
    const increment = totalFund / (duration / stepTime);
    const counter = setInterval(() => {
      start += increment;
      if (start >= totalFund) {
        start = totalFund;
        clearInterval(counter);
      }
      setDisplayFund(Math.floor(start));
    }, stepTime);
    return () => clearInterval(counter);
  }, [totalFund]);

  // ==== ⏳ Đếm ngược thời gian ====
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 25,
    seconds: 4,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden scroll-smooth">
      <BannerCustomComponent
        title={dataBanner.title}
        content={dataBanner.content}
        buttonText={dataBanner.buttonText}
      />

      <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
        <BreadcrumbRibbon
          label="Quỹ hành trình"
          detailLabel="Chi tiết"
          className="mb-4"
        />
      </div>

      <section className="w-full flex justify-center bg-white py-10 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {/* ===== Cột trái (nội dung chính) ===== */}
          <div className="lg:col-span-2 grid grid-cols-1 border-r-2 gap-6 font-body">
            <div className="flex flex-col px-4">
              {/* Header thông tin bài viết */}
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

              {/* Tiêu đề */}
              <h2 className="text-3xl mt-6 line-clamp">
                Tổng kết hành trình chuyến xe Bác Ái tại Ninh Thuận
              </h2>

              {/* Thông tin thời gian & địa điểm */}
              <div className="flex justify-start gap-6 mt-6 items-center bg-[#E2F9FF] text-[#355C7D] font-medium p-4">
                <p>Thời gian tổ chức: 2 - 12 Sep 2021</p>
                <p>Địa điểm: Ninh Thuận</p>
              </div>

              {/* Mô tả */}
              <p className="my-4">
                Một chuyến đi rất đáng nhớ bởi cái nắng khắc nghiệt đúng như
                truyền thuyết “gió như phang, nắng như rang” tại vùng đất Ninh
                Thuận. Những gương mặt đỏ bừng bỏng rát, cơ thể cạn kiệt năng
                lượng bởi cái nắng nóng cháy da cháy thịt. Lời động viên lẫn
                nhau “ráng lên tí nữa” được lặp lại khoảng 188 lần để biệt đội
                “chiếc xe bát nháo” cùng nhau thực hiện gần như trọn vẹn kế
                hoạch.
              </p>

              {/* ✅ Tổng tiền quyên góp (hiệu ứng) */}
              <div className="mt-4 bg-[#FFF8E1] border border-[#FFB800]/40 rounded-lg p-4 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-[#355C7D] mb-1">
                  Tổng số tiền quyên góp được
                </h3>
                <p className="text-3xl font-bold text-[#FFB800] transition-all duration-500">
                  {new Intl.NumberFormat("vi-VN").format(displayFund)} VNĐ
                </p>
                <p className="text-sm text-gray-600 mt-1 italic">
                  (Bao gồm quyên góp từ cộng đồng và lợi nhuận các hoạt động gây quỹ)
                </p>
              </div>

              {/* 🕒 Bộ đếm ngược */}
              <div className="mt-6 bg-[#E3F2FD] border border-[#90CAF9]/50 rounded-lg p-4 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-[#355C7D] mb-2">
                  ⏳ Dự án sắp diễn ra
                </h3>
                <p className="text-[#FFB800] font-semibold mb-2">
                  Thời gian còn lại
                </p>
                <div className="flex justify-center gap-4 text-[#355C7D] font-bold text-lg">
                  <div className="text-center">
                    <p>{timeLeft.hours.toString().padStart(2, "0")}</p>
                    <span className="text-sm text-gray-500">GIỜ</span>
                  </div>
                  <div className="text-center">
                    <p>{timeLeft.minutes.toString().padStart(2, "0")}</p>
                    <span className="text-sm text-gray-500">PHÚT</span>
                  </div>
                  <div className="text-center">
                    <p>{timeLeft.seconds.toString().padStart(2, "0")}</p>
                    <span className="text-sm text-gray-500">GIÂY</span>
                  </div>
                </div>
              </div>

              {/* Bảng đóng góp & tóm tắt */}
              <ContributionTable />
              <SummarySection dataOptions={fundData} />
              <ExpenseSummarySection
                incomeItems={expenseData}
                totalIncome={98154390}
                totalExpense={90577800}
                remaining={7576690}
              />

              {/* Tin khác */}
              <div className="flex flex-col space-y-4 mt-6">
                <h2 className="text-xl font-medium text-[#355C7D]">TIN KHÁC:</h2>
                <CustomSwiper
                  items={sideNews}
                  slidesPerView={2}
                  breakpoints={{
                    640: { slidesPerView: 1 },
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

          {/* ===== Cột phải (Tin nổi bật) ===== */}
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
