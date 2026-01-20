import React from 'react';
import bannerImg from '@/assets/images/Home/banner.png';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import TimelineComponent from '@/components/TimelineComponent';
import UpcomingJourneySection from '@/components/UpcomingJournneySection';
import OngoingJourneySection from '@/components/OngoingJourneySection';
import { useCampaignOngoing, useCampaignCompleted, useJourneyTimeline } from '@/hooks/campaign.hook';
const JourneyPage: React.FC = () => {
    const dataBanner = {
        title: "Hành trình",
        content: "Cùng nhau đi qua từng chặng đường, lưu giữ những khoảnh khắc đáng nhớ",
        buttonText: "Theo dõi hành trình",
    };
    // Fetch data from API
    const { data: timeline = [] } = useJourneyTimeline();
    const { data: ongoing = [] } = useCampaignOngoing();
    const { data: completed = [] } = useCampaignCompleted();

    // Map API timeline to TimelineComponent shape
    const timelineData = (timeline || []).map((t) => ({
        id: t.id,
        title: t.title,
        content: t.description,
        dateLabel: t.dateLabel,
        color: undefined,
        status: t.status,
    }));

    // Map campaigns to the JourneyItem shape expected by sections
    const mapCampaignsToJourney = (arr: any[]) =>
        (arr || []).map((c: any, idx: number) => ({
            id: Number(c.id) || idx + 1,
            title: c.title ?? `Chuyến ${idx + 1}`,
            cards: [
                {
                    headline: c.title ?? "",
                    img: c.cover_url ?? bannerImg,
                    description: c.location ?? c.description ?? "",
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
            ],
        }));

    const journeyData = mapCampaignsToJourney(completed);
    const ongoingJourneys = mapCampaignsToJourney(ongoing);
    return (
        <div className='w-full flex flex-col items-center overflow-x-hidden scroll-smooth'>
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />
            <div className="max-w-7xl px-4 py-6 flex flex-col items-start w-full">
                <BreadcrumbRibbon label="Hành trình" className="mb-4" />
            </div>
            <section className="w-full flex justify-center py-2 sm:py-4 px-4 sm:px-8 bg-white">
                <div className="w-full max-w-[1200px]">
                    <div className="flex justify-start mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                            Chuỗi hành trình
                        </h2>
                    </div>
                    <div className="text-base text-gray-800  leading-snug font-body mb-6">
                        Cùng nhau đi qua từng chặng đường, lưu giữ những khoảnh khắc đáng nhớ.
                    </div>
                    <button
                        className="bg-sky-300 hover:bg-sky-500 text-white px-10 py-3 rounded-3xl shadow transition duration-300"
                    >
                        Bắt đầu
                    </button>
                    <TimelineComponent data={timelineData} />

                </div>
            </section>
            <OngoingJourneySection data={ongoingJourneys} title={"Hành trình diễn ra"} />
            <UpcomingJourneySection data={journeyData} title={"Hành trình đã diễn ra"} subLabel={"Đã diễn ra"} />
        </div>
    );
};

export default JourneyPage;