import React from 'react';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import CustomSwiper from '@/components/SwiperComponent';
import bannerImg from '@/assets/images/Home/banner.png';
const MembersPage: React.FC = () => {
    const dataBanner = {
        title: "Thành viên",
        content: "Mỗi thành viên là một mảnh ghép quan trọng, một dấu chân trên hành trình mang yêu thương đến những nơi cần được chạm tới.",
        buttonText: "Xem chi tiết thành viên",
    }
    const cardMember = [
        {
            id: 1,
            headlines: "headline 1",
            img: bannerImg,
            description: "description 1",
        },
        {
            id: 2,
            headlines: "headline 2",
            img: bannerImg,
            description: "description 2",
        },
    ]
    const quotes = [
        {
            id: 1,
            content:
                "Hạnh phúc không phải là đích đến, mà là hành trình chúng ta cùng nhau chia sẻ.",
            author: "Nguyễn Văn A",
        },
        {
            id: 2,
            content:
                "Mỗi bàn tay đưa ra là một nhịp cầu nối yêu thương đến những nơi còn thiếu thốn.",
            author: "Trần Thị B",
        },
        {
            id: 3,
            content:
                "Cho đi không bao giờ làm ta nghèo đi, mà chỉ làm trái tim thêm giàu có.",
            author: "Lê Minh C",
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
                <BreadcrumbRibbon label="Thành viên" className="mb-4" />
            </div>

            {/* ===== THÀNH VIÊN NỔI BẬT ===== */}
            <section className="w-full flex justify-center bg-[#f5fbff] py-10 px-4 sm:px-8">
                <div className="max-w-7xl w-full">
                    <div className="flex justify-start mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#355C7D] border-2 border-yellow-400 rounded-full px-8 py-2 bg-white shadow-sm">
                            Danh sách thành viên
                        </h2>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2f5573] mb-8">
                        Thành viên nổi bật
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {cardMember.map((member) => (
                            <div
                                key={member.id}
                                className={`flex flex-col h-60 sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
                            >
                                {/* Ảnh bên trái */}
                                <div className="sm:w-1/2 w-full h-60 sm:h-auto">
                                    <img
                                        src={member.img}
                                        alt={member.headlines}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Nội dung bên phải */}
                                <div className="sm:w-1/2 w-full p-6 flex flex-col justify-center">
                                    <h4 className="text-xl font-semibold text-[#355C7D] mb-3">
                                        {member.headlines}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="w-full grid grid-cols-2 h-96 bg-white py-16 px-4 sm:px-8">
                <div className="max-w-4xl w-full text-left px-4">
                    <CustomSwiper
                        items={quotes}
                        slidesPerView={1}
                        navId="quotes"
                        renderSlide={(q) => (
                            <div className="flex flex-col items-start">
                                <p className="text-lg sm:text-xl italic text-gray-700 max-w-2xl mb-4">
                                    “{q.content}”
                                </p>
                                <span className="text-[#355C7D] font-semibold text-base">
                                    — {q.author}
                                </span>
                            </div>
                        )}
                    />
                </div>
                <div className='w-full grid grid-cols-2 px-4'>
                    <img src={bannerImg} alt="img" className='w-full h-full object-cover rounded-lg shadow-lg' />
                    <div className='w-full flex flex-col rounded-lg justify-between ml-4 p-4 bg-[#89CFF0]'>
                        <div>
                            <h3 className='text-xl text-white font-semibold'>Heading</h3>
                            <p className='text-base mt-2 text-white'>content</p>
                        </div>
                        <button className='mt-4 bg-[#FFD966] hover:bg-yellow-400 text-white px-4 py-2 rounded-xl transition duration-300 self-start'>
                            Apply Now
                        </button>
                    </div>
                </div>
            </section>
            {/* ===== HÌNH ẢNH THÀNH VIÊN ===== */}
            <section className="w-full flex justify-center bg-[#f5fbff] py-16 px-4 sm:px-8">
                <div className="max-w-7xl w-full text-center">
                    <CustomSwiper
                        items={[1, 2, 3, 4, 5, 6, 7, 8]} // bạn có thể thay bằng dữ liệu thật
                        slidesPerView={4}
                        navId="memberImages"
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        renderSlide={(i) => (
                            <div
                                key={i}
                                className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={bannerImg}
                                    alt={`Thành viên ${i}`}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-3">
                                    <h4 className="text-[#355C7D] font-semibold">Thành viên {i}</h4>
                                    <p className="text-gray-500 text-sm mt-1">Vai trò hoặc mô tả</p>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </section>

        </div>
    );
};

export default MembersPage;