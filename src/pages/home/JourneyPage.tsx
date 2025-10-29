import React from 'react';
import bannerImg from '@/assets/images/Home/banner.png';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import TimelineComponent from '@/components/TimelineComponent';
import UpcomingJourneySection from '@/components/UpcomingJournneySection';
import OngoingJourneySection from '@/components/OngoingJourneySection';
const JourneyPage: React.FC = () => {
    const dataBanner = {
        title: "Hành trình",
        content: "Cùng nhau đi qua từng chặng đường, lưu giữ những khoảnh khắc đáng nhớ",
        buttonText: "Theo dõi hành trình",
    };
    const timelineData = [
        {
            id: 1,
            title: "Kỳ 1",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur pulvinar cursus in donec mauris enim. Sit sed vel molestie ullamcorper.",
            date: "Jan 2020",
            color: "#355C7D",
        },
        {
            id: 2,
            title: "Kỳ 2",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget rhoncus nunc aliquet eu, tellus cras lacinia cursus.",
            date: "Feb 2020",
            color: "#F39C12",
        },
        {
            id: 3,
            title: "Kỳ 3",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sed vel molestie ullamcorper.",
            date: "Mar 2020",
            color: "#355C7D",
        },
        {
            id: 4,
            title: "Kỳ 4",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet nunc nullam aliquam. Mauris massa lectus gravida eget cras vel lorem nunc.",
            date: "Apr 2020",
            color: "#F39C12",
        },
        {
            id: 5,
            title: "Kỳ 5",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur pulvinar cursus in donec mauris enim.",
            date: "May 2020",
            color: "#355C7D",
        },
        {
            id: 6,
            title: "Kỳ 6",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa lectus gravida eget cras vel lorem nunc.",
            date: "Jun 2020",
            color: "#F39C12",
        },
    ];
    const journeyData = [
        {
            id: 1,
            title: "Chuyến xe Bác Ái kỳ 1",
            cards: [
                {
                    headline: "Headline",
                    img: bannerImg,
                    description: "Write an amazing description in this dedicated card section.",
                    hours: 12,
                    minutes: 25,
                    seconds: 4,
                },
                {
                    headline: "Headline",
                    img: bannerImg,
                    description: "Write an amazing description in this dedicated card section.",
                    hours: 12,
                    minutes: 25,
                    seconds: 4,
                },
                {
                    headline: "Headline",
                    img: bannerImg,
                    description: "Write an amazing description in this dedicated card section.",
                    hours: 12,
                    minutes: 25,
                    seconds: 4,
                },
            ],
        },
        {
            id: 2,
            title: "Chuyến xe Bác Ái kỳ 2",
            cards: [],
        },
        {
            id: 3,
            title: "Chuyến xe Bác Ái kỳ 3",
            cards: [],
        },
    ];
    const ongoingJourneys = [
        {
            id: 1,
            title: "Chuyến xe Bác Ái kỳ 10",
            cards: [],
        },
        {
            id: 2,
            title: "Chuyến xe Bác Ái kỳ 9",
            cards: [
                {
                    headline: "Headline",
                    img: bannerImg,
                    description:
                        "Write an amazing description in this dedicated card section. Each word counts.",
                },
                {
                    headline: "Headline",
                    img: bannerImg,
                    description:
                        "Write an amazing description in this dedicated card section. Each word counts.",
                },
            ],
        },
        {
            id: 3,
            title: "Chuyến xe Bác Ái kỳ 8",
            cards: [],
        },
        {
            id: 4,
            title: "Chuyến xe Bác Ái kỳ 7",
            cards: [],
        },
    ];
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
            <UpcomingJourneySection data={journeyData} />
            <OngoingJourneySection data={ongoingJourneys} />
        </div>
    );
};

export default JourneyPage;