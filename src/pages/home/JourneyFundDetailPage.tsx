import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import BannerCustomComponent from "@/components/BannerCustomComponent";
import BreadcrumbRibbon from "@/components/BreadcrumbRibbon";
import ContributionTable from "@/components/ContributionTable";
import SummarySection from "@/components/SummarySection";
import ExpenseSummarySection from "@/components/ExpenseSummarySection";
import CustomSwiper from "@/components/SwiperComponent";
import SideCard from "@/components/SideCard";

import { MdPerson } from "react-icons/md";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";

import { useGetContentById, useGetContentLatest } from "@/hooks/content.hook";
import { journeyFundDetailRoute } from "@/routes/home";
import { formatDateVN } from "@/helpers/date";
/* =======================
 * Component
 ======================= */
const JourneyFundDetailPage: React.FC = () => {
  const navigate = useNavigate();

  /* ===== Lấy ID từ route fund/$id ===== */
  const { id } = useParams({
    from: journeyFundDetailRoute.id,
  });

  /* ===== Call API ===== */
  const { data, isLoading } = useGetContentById(id);
  const { data: latestData, isLoading: isLatestLoading } = useGetContentLatest({ page: 1, pageSize: 5 });

  /* =======================
   * Banner
   ======================= */
  const bannerData = useMemo(
    () => ({
      title: "Quỹ hành trình",
      content:
        "Nơi yêu thương được san sẻ – cùng nhau vun đắp từng chuyến xe.",
      buttonText: "Xem hành trình gây quỹ",
    }),
    []
  );


  /* =======================
   * Tổng tiền quyên góp
   ======================= */
  const totalFund = data?.pieChart?.total ?? 0;
  const [displayFund, setDisplayFund] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
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


  /* =======================
   * Map dữ liệu Summary
   ======================= */
  const fundData = useMemo(() => {
    if (!data?.pieChart) return [];

    return [
      {
        period: "Tổng hợp",
        items: [
          {
            name: "Tiền mặt",
            value: data.pieChart.cash ?? 0,
            color: "#3B82F6",
          },
          {
            name: "Chuyển khoản",
            value: data.pieChart.transfer ?? 0,
            color: "#93C5FD",
          },
          {
            name: "Khác",
            value: data.pieChart.others ?? 0,
            color: "#CBD5E1",
          },
        ],
      },
    ];
  }, [data]);

  const expenseData = useMemo(() => {
    if (!data?.summaryTable) return [];

    return [
      {
        label: "Quyên góp",
        amount: data.summaryTable.row1_Donation ?? 0,
      },
      {
        label: "Bán hàng gây quỹ",
        amount: data.summaryTable.row2_Sales ?? 0,
      },
      {
        label: "Quỹ tồn kỳ trước",
        amount: data.summaryTable.row3_Previous ?? 0,
      },
    ];
  }, [data]);

  /* =======================
   * Loading
   ======================= */
  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Đang tải chi tiết quỹ...
      </div>
    );
  }

  /* =======================
   * Render
   ======================= */
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <BannerCustomComponent {...bannerData} />

      <div className="max-w-7xl px-4 py-6 w-full">
        <BreadcrumbRibbon
          label="Quỹ hành trình"
          detailLabel={data?.title ?? "Chi tiết"}
        />
      </div>

      <section className="w-full flex justify-center bg-white py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {/* ===== LEFT ===== */}
          <div className="lg:col-span-2 border-r-2 px-4">
            <div className="flex gap-4 text-[#355C7D] font-medium">
              <div className="flex items-center gap-2">
                <MdPerson /> <span>Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{data?.published_at ? formatDateVN(data.published_at) : "--"}</span>
              </div>
            </div>

            <h2 className="text-3xl mt-6">{data?.title}</h2>

            <div className="mt-6 bg-[#E2F9FF] p-4 font-medium text-[#355C7D]">
              <p>
                Thời gian: {data?.campaign?.start_date ? formatDateVN(data.campaign.start_date) : "--"} -{" "}
                {data?.campaign?.end_date ? formatDateVN(data.campaign.end_date) : "--"}
              </p>
              <p>Địa điểm: {data?.campaign?.location}</p>
            </div>
            <p className="my-4 whitespace-pre-line">
              {data?.content_md}
            </p>

            {/* Tổng tiền */}
            <div className="mt-4 bg-[#FFF8E1] p-4 text-center rounded-lg">
              <h3 className="font-semibold mb-1">
                Tổng số tiền quyên góp
              </h3>
              <p className="text-3xl font-bold text-[#FFB800]">
                {new Intl.NumberFormat("vi-VN").format(displayFund)} VNĐ
              </p>
            </div>
            <ContributionTable
              incomes={data?.transactions?.incomes?.map((i) => ({
                donor: i?.name,
                createdAt: i?.time,
                amount: i?.amount,
                note: i?.note,
              })) ?? []}
              expenses={data?.transactions?.expenses?.map((e) => ({
                donor: e?.content,
                createdAt: e?.time,
                amount: e?.amount,
                note: e?.image,
              })) ?? []}
            />
            <SummarySection dataOptions={fundData} />
            <ExpenseSummarySection
              incomeItems={expenseData}
              totalIncome={data?.summaryTable?.totalIncome ?? 0}
              totalExpense={data?.summaryTable?.totalExpense ?? 0}
              remaining={data?.summaryTable?.remaining ?? 0}
            />

            {/* Tin khác */}
            <div className="mt-8">
              <h3 className="text-xl mb-4">TIN KHÁC</h3>
              <CustomSwiper
                items={latestData?.data ?? []}
                slidesPerView={2}
                navId="tin-khac"
                renderSlide={(item) => (
                  <SideCard
                    title={item.title}
                    content={item.summary}
                    imgUrl={item.cover_url}
                    onClick={() =>
                      navigate({
                        to: journeyFundDetailRoute.to,
                        params: { id: item.id },
                      })
                    }
                  />
                )}
              />
            </div>
          </div>

          {/* ===== RIGHT ===== */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-[#355C7D]">
              Tin Nổi Bật
            </h2>

            {latestData?.data?.map((item) => (
              <SideCard
                key={item.id}
                title={item.title}
                content={item.summary}
                imgUrl={item.cover_url}
                onClick={() =>
                  navigate({
                    to: journeyFundDetailRoute.to,
                    params: { id: item.id },
                  })
                }
              />
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default JourneyFundDetailPage;
