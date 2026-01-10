import React, { useEffect, useState } from 'react';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import CustomDropdown from '@/components/DropdownComponent';
import FundChart from '@/components/FundChart';
import HotNewsSection from '@/components/HotNewsSection';
import bannerImg from '@/assets/images/Home/banner.png';
import { useCampaigns } from '@/hooks/campaign.hook';
import { useGetFundCharts, useGetFundStats } from '@/hooks/finance.hook';
const JourneyFundPage: React.FC = () => {
    const dataBanner = {
        title: "Quỹ hành trình",
        content: "Nơi yêu thương được san sẻ – cùng nhau vun đắp từng chuyến xe.",
        buttonText: "Xem hành trình gây quỹ",
    };
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<string>(String(currentYear));

    // fetch campaigns list
    const { data: campaigns = [], isLoading: loadingCampaigns } = useCampaigns({ q: '' });

    // set default campaign to latest (first item) when available
    useEffect(() => {
        if (!selectedCampaignId && campaigns && campaigns.length > 0) {
            setSelectedCampaignId(campaigns[0].id);
        }
    }, [campaigns, selectedCampaignId]);

    // fund stats and charts hooks (enabled when campaign/year available)
    const { data: fundStats, isLoading: loadingStats } = useGetFundStats(selectedCampaignId);
    const { data: fundCharts, isLoading: loadingCharts } = useGetFundCharts(selectedCampaignId, parseInt(selectedYear, 10));

    const fundStatistics = [
        {
            id: 1,
            label: "Tổng số tiền thu được",
            value: fundStats?.totalMoney ? `${fundStats.totalMoney.toLocaleString()} VND` : "-",
        },
        {
            id: 2,
            label: "Tổng số tiền hiện vật quyên góp",
            value: fundStats?.totalItems ? `${fundStats.totalItems.toLocaleString()} VND` : "-",
        },
        {
            id: 3,
            label: "Tổng người tham gia đóng góp",
            value: fundStats?.totalDonors ? String(fundStats.totalDonors) : "-",
        },
        {
            id: 4,
            label: "Tổng số hoạt động gây quỹ đã tổ chức",
            value: fundStats?.totalActivities ? String(fundStats.totalActivities) : "-",
        }
    ];
    // map fundCharts to FundChart expected shape
    const chartData = (fundCharts || []).map((c) => ({ month: c.label || '', value: c.value || 0 }));
    const dummyNews = [
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
        {
            id: 4,
            title: "Chuyến xe bác ái kỳ 13",
            content: "Trao hơn 100 phần quà tại Bến Tre...",
            imgUrl: bannerImg,
            createAt: "12 giờ trước",
            createdBy: "By Lucy Hiddleston",
        },
        {
            id: 5,
            title: "Chuyến xe bác ái kỳ 14",
            content: "Khởi hành đợt mới cùng hàng trăm tình nguyện viên.",
            imgUrl: bannerImg,
        },
        {
            id: 6,
            title: "Chuyến xe bác ái kỳ 15",
            content: "Lan tỏa yêu thương trên hành trình mới.",
            imgUrl: bannerImg,
        },
    ];


    const filteredStats = fundStatistics;
    return (
        <div className='w-full flex flex-col items-center overflow-x-hidden scroll-smooth'>
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />
            <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
                <BreadcrumbRibbon label="Quỹ hành trình" className="mb-4" />
            </div>
            <section className="w-full flex justify-center py-2 sm:py-4 px-4 sm:px-8 bg-white">
                <div className="max-w-7xl w-full">
                    <div className="flex justify-between mb-8 items-center">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                            Quỹ hành trình
                        </h2>
                        <div className="flex items-center space-x-4">
                            <CustomDropdown
                                options={campaigns.map((c) => ({ label: c.title || 'Không tên', value: c.id }))}
                                defaultValue={selectedCampaignId ?? (campaigns[0]?.id ?? '')}
                                onChange={(val) => setSelectedCampaignId(val)}
                            />
                            <CustomDropdown
                                options={Array.from({ length: 5 }).map((_, idx) => {
                                    const y = currentYear - idx;
                                    return { label: String(y), value: String(y) };
                                })}
                                defaultValue={selectedYear}
                                onChange={(val) => setSelectedYear(val)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {filteredStats.map((stat) => (
                            <div key={stat.id} className="p-6 bg-[#355C7D] rounded-lg shadow-md">
                                <h3 className="text-base font-semibold text-white mb-2">{stat.label}</h3>
                                <p className="text-2xl font-semibold text-[#FFD966]">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 border rounded-lg shadow'>
                        <FundChart data={chartData} title="Tổng tiền quyên góp theo tháng" />
                    </div>
                    <div>
                        <HotNewsSection newsItems={dummyNews} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JourneyFundPage;