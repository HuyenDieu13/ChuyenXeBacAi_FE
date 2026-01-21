import React from 'react';
import BannerCustomComponent from '@/components/BannerCustomComponent';
import BreadcrumbRibbon from '@/components/BreadcrumbRibbon';
import CustomSwiper from '@/components/SwiperComponent';
import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.jpg';
import img3 from '@/assets/images/3.jpg';
import img5 from '@/assets/images/5.jpg';
import img6 from '@/assets/images/6.jpg';
import img7 from '@/assets/images/7.jpg';
import img9 from '@/assets/images/9.jpg';
import img10 from '@/assets/images/10.jpg';
import img12 from '@/assets/images/12.jpg';
import img13 from '@/assets/images/13.jpg';
import img19 from '@/assets/images/19.jpg';


const MembersPage: React.FC = () => {
    /* ================= BANNER ================= */
    const dataBanner = {
        title: "Thành viên",
        content:
            "Mỗi thành viên là một câu chuyện, một đóng góp thầm lặng tạo nên hành trình lan tỏa yêu thương và giá trị bền vững cho cộng đồng.",
        buttonText: "Khám phá cộng đồng",
    };

    /* ================= THÀNH VIÊN NỔI BẬT ================= */
    const cardMember = [
        {
            id: 1,
            name: "Nguyễn Thị Thu Hương",
            position: "Thành viên sáng lập",
            img: img10,
            description:
                "Đồng hành từ những ngày đầu hình thành, Thu Hương đóng vai trò định hướng hoạt động và xây dựng nền tảng giá trị cho cộng đồng.",
        },
        {
            id: 2,
            name: "Trần Minh Quân",
            position: "Điều phối hoạt động",
            img: img5,
            description:
                "Phụ trách kết nối các thành viên và tổ chức chương trình, Minh Quân góp phần đảm bảo các hoạt động diễn ra hiệu quả và bền vững.",
        },
        {
            id: 3,
            name: "Lê Hoàng Anh",
            position: "Phụ trách nội dung & truyền thông",
            img: img9,
            description:
                "Chịu trách nhiệm xây dựng nội dung và lan tỏa câu chuyện cộng đồng thông qua các kênh truyền thông chính thức.",
        },
        {
            id: 4,
            name: "Phạm Ngọc Lan",
            position: "Tình nguyện viên nòng cốt",
            img: img13,
            description:
                "Luôn hiện diện trong các hoạt động thiện nguyện, Ngọc Lan mang đến sự chỉn chu và nguồn năng lượng tích cực cho tập thể.",
        },
    ];

    /* ================= CÂU NÓI TRUYỀN CẢM HỨNG ================= */
    const quotes = [
        {
            id: 1,
            content:
                "Khi chúng ta trao đi sự tử tế bằng hành động cụ thể, những giá trị tốt đẹp sẽ tự nhiên lan tỏa.",
            author: "Nguyễn Thị Thu Hương – Thành viên sáng lập",
        },
        {
            id: 2,
            content:
                "Thiện nguyện không nằm ở quy mô lớn hay nhỏ, mà ở sự kiên trì và chân thành trong từng việc làm.",
            author: "Trần Minh Quân – Điều phối hoạt động",
        },
        {
            id: 3,
            content:
                "Mỗi người một vai trò, nhưng khi cùng chung mục tiêu, chúng ta có thể tạo nên thay đổi tích cực cho cộng đồng.",
            author: "Lê Hoàng Anh – Truyền thông",
        },
        {
            id: 4,
            content:
                "Điều ý nghĩa nhất không phải là chúng ta đã làm bao nhiêu, mà là đã làm bằng cả sự thấu hiểu.",
            author: "Phạm Ngọc Lan – Tình nguyện viên",
        },
        {
            id: 5,
            content:
                "Sự sẻ chia bền vững bắt đầu từ những hành động nhỏ nhưng được lặp lại mỗi ngày.",
            author: "Thành viên cộng đồng",
        },
    ];

    /* ================= GALLERY THÀNH VIÊN ================= */
    const memberGallery = [
        { id: 1, name: "Nguyễn Hoàng Minh", role: "Tình nguyện viên", img: img3 },
        { id: 2, name: "Trần Thị Ngọc Anh", role: "Hỗ trợ chương trình", img: img12 },
        { id: 3, name: "Lê Quốc Bảo", role: "Thành viên cộng đồng", img: img2 },
        { id: 4, name: "Phạm Minh Châu", role: "Điều phối sự kiện", img: img1 },
        { id: 5, name: "Võ Thanh Tâm", role: "Tình nguyện viên", img: img7 },
        { id: 6, name: "Nguyễn Thị Kim Oanh", role: "Hỗ trợ hậu cần", img: img6 },
        { id: 7, name: "Đặng Nhật Huy", role: "Thành viên đồng hành", img: img5 },
        { id: 8, name: "Lý Thanh Thảo", role: "Cộng tác viên", img: img9},
    ];

    return (
        <div className="w-full flex flex-col items-center overflow-x-hidden scroll-smooth">
            <BannerCustomComponent
                title={dataBanner.title}
                content={dataBanner.content}
                buttonText={dataBanner.buttonText}
            />

            <div className="max-w-7xl px-4 py-6 w-full">
                <BreadcrumbRibbon label="Thành viên" />
            </div>

            {/* ===== DANH SÁCH THÀNH VIÊN ===== */}
            <section className="w-full flex justify-center bg-[#f5fbff] py-10 px-4">
                <div className="max-w-7xl w-full">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#355C7D] mb-8">
                        Thành viên nổi bật
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {cardMember.map((member) => (
                            <div
                                key={member.id}
                                className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="sm:w-1/2 h-60">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="sm:w-1/2 p-6 flex flex-col justify-center">
                                    <h4 className="text-xl font-semibold text-[#355C7D]">
                                        {member.name}
                                    </h4>
                                    <span className="text-sm text-[#6b8aa6] mb-2">
                                        {member.position}
                                    </span>
                                    <p className="text-gray-600">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== QUOTES & GIỚI THIỆU ===== */}
            <section className="w-full grid grid-cols-1 md:grid-cols-2 bg-white py-16 px-4">
                <div className="max-w-4xl px-4">
                    <CustomSwiper
                        items={quotes}
                        slidesPerView={1}
                        navId="quotes"
                        renderSlide={(q) => (
                            <div>
                                <p className="text-lg italic text-gray-700 mb-4">
                                    “{q.content}”
                                </p>
                                <span className="text-[#355C7D] font-semibold">
                                    — {q.author}
                                </span>
                            </div>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 px-4 mt-10 md:mt-0">
                    <img
                        src={img19}
                        alt="community"
                        className="rounded-lg object-cover shadow-lg"
                    />
                    <div className="bg-[#89CFF0] rounded-lg p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl text-white font-semibold">
                                Trở thành một phần của hành trình
                            </h3>
                            <p className="text-white mt-2">
                                Mỗi sự tham gia đều góp phần xây dựng cộng đồng tích cực và nhân văn.
                            </p>
                        </div>
                        <button className="mt-4 bg-[#FFD966] text-white px-4 py-2 rounded-xl self-start">
                            Tham gia cộng đồng
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== GALLERY THÀNH VIÊN ===== */}
            <section className="w-full flex justify-center bg-[#f5fbff] py-16 px-4">
                <div className="max-w-7xl w-full">
                    <CustomSwiper
                        items={memberGallery}
                        slidesPerView={4}
                        navId="memberImages"
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        renderSlide={(member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="text-[#355C7D] font-semibold">
                                        {member.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        {member.role}
                                    </p>
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
