import bannerImg from "@/assets/images/Home/banner.png";
import SuMenhImg from "@/assets/images/Home/SuMenh.png";
import DonateImg from "@/assets/images/Home/Donate.png";
import React, { useState } from "react";
import videoThumbnail from "@/assets/images/Home/banner.png";

const HomePage: React.FC = () => {
    const recentImages = [
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1200&auto=format&fit=crop",
    ];

    const memberImages = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop",
    ];
    const [selectedPeriod, setSelectedPeriod] = useState(1);

    const data = [
        { id: 1, money: "120.000.000 VNĐ", items: "10.000 Vật Phẩm" },
        { id: 2, money: "95.500.000 VNĐ", items: "8.200 Vật Phẩm" },
        { id: 3, money: "130.200.000 VNĐ", items: "11.000 Vật Phẩm" },
        { id: 4, money: "110.000.000 VNĐ", items: "9.500 Vật Phẩm" },
        { id: 5, money: "150.000.000 VNĐ", items: "12.300 Vật Phẩm" },
    ];

    const current = data.find((d) => d.id === selectedPeriod)!;

    return (
        <div className="w-full flex flex-col items-center overflow-x-hidden scroll-smooth">
            {/* ================= HERO ================= */}
            <section
                className="relative w-full h-[80vh] sm:h-[90vh] lg:h-screen bg-cover bg-center flex flex-col justify-center items-center text-center text-white"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                {/* Overlay làm mờ nhẹ để chữ nổi bật */}
                <div className="absolute inset-0 bg-black/30 sm:bg-black/25 lg:bg-black/20" />

                {/* Nội dung chính */}
                <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1280px] mx-auto flex flex-col items-center">

                    <button className="rounded-full px-6 sm:px-10 lg:px-12 py-2 sm:py-3 lg:py-4 bg-yellow-500 text-base sm:text-xl lg:text-2xl font-semibold hover:bg-yellow-600 transition">
                        Khám phá hành trình
                    </button>
                </div>
            </section>
            {/* ================= SỨ MỆNH ================= */}

            <section className="w-full flex flex-col bg-[#EAF8FF] py-16 sm:py-20 px-4 sm:px-8">
                {/* Tiêu đề Sứ Mệnh */}
                <div className="w-full flex justify-end pr-4 sm:pr-10 lg:pr-20">
                    <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-6 py-2 text-lg font-heading shadow-sm">
                        Sứ Mệnh
                    </div>
                </div>

                {/* Nội dung mô tả */}
                <div className="w-full flex justify-end mt-6">
                    <p className="w-full text-gray-700 text-base sm:text-lg leading-relaxed text-right pr-4 sm:pr-10 lg:pr-20">
                        Chiếc xe chuyên chở yêu thương đến các trường học vùng sâu, tiếp năng lượng cho
                        các em vững bước đến trường. Vùng đất khô cằn nảy lên những mầm tươi xanh,
                        những cuộc sống mới trở nên bừng sáng và hé mở hy vọng.
                    </p>
                </div>

                {/* Hình ảnh */}
                <div className="w-full flex justify-center mt-10">
                    <img
                        src={SuMenhImg}
                        alt="Sứ mệnh"
                        className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] object-contain"
                    />
                </div>
            </section>

            {/* ================= CẬP NHẬT GẦN ĐÂY ================= */}
            <section className="w-full flex justify-center py-14 sm:py-20 px-4 sm:px-8 bg-white">
                <div className="w-full max-w-[1280px]">
                    <div className="flex flex-wrap justify-between items-center mb-8">
                        <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg font-heading">
                            Cập nhật gần đây
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-sky-200 rounded-full text-sky-700 flex items-center justify-center hover:brightness-95">
                                ‹
                            </button>
                            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-sky-200 rounded-full text-sky-700 flex items-center justify-center hover:brightness-95">
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Tiết mục Hò kéo pháo siêu dễ thương",
                                desc:
                                    "Các em học sinh Tiểu học Quảng Sơn B điểm làng Lương Giang đã dành tặng cho Xe.",
                                date: "12 Sep 2021",
                                author: "Esther Howard",
                                img: recentImages[0],
                            },
                            {
                                title: "Tổng kết hành trình kỳ 11 tại Ninh Thuận",
                                desc:
                                    "Một chuyến đi đáng nhớ với cái nắng khắc nghiệt 'gió như phang, nắng như rang'.",
                                date: "22 Aug 2021",
                                author: "Jacob Jones",
                                img: recentImages[1],
                            },
                            {
                                title: "This Week’s Top Stories About Charity",
                                desc:
                                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy tempor invidunt...",
                                date: "22 Aug 2021",
                                author: "Jacob Jones",
                                img: recentImages[2],
                            },
                        ].map((post, i) => (
                            <article
                                key={i}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden text-left"
                            >
                                <img src={post.img} alt={post.title} className="w-full h-52 sm:h-56 object-cover" />
                                <div className="p-5">
                                    <div className="flex items-center text-xs text-gray-500 gap-4 mb-3">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{post.desc}</p>

                                    <button className="mt-4 border border-yellow-500 text-yellow-600 px-4 py-2 rounded-full text-sm hover:bg-yellow-50">
                                        Read More
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= VIDEO CLIP ================= */}
            <section className="w-full bg-[#DFF4FF] py-16 sm:py-20 px-4 sm:px-8 flex flex-col lg:flex-row justify-center items-center lg:items-stretch">
                {/* Cột trái - nội dung */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left px-6 sm:px-12 lg:pl-20 lg:pr-10">
                    {/* Tiêu đề */}
                    <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-6 py-2 text-lg font-heading inline-block mb-6 shadow-sm">
                        Video Clip
                    </div>

                    {/* Tiêu đề phụ màu xanh */}
                    <h2 className="text-[#0077b6] text-2xl sm:text-3xl font-heading mb-4">
                        Hành Trình Yêu Thương
                    </h2>

                    {/* Mô tả */}
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                        Một chuyến đi rất đáng nhớ bởi cái nắng khắc nghiệt đúng như truyền thuyết “gió như phang, nắng như rang” tại vùng đất Ninh Thuận.
                    </p>

                    {/* Nút điều hướng */}
                    <div className="flex gap-3 justify-start mt-4">
                        <button className="w-10 h-10 rounded-full bg-white border text-gray-500 hover:text-yellow-600 hover:border-yellow-400 transition">
                            ‹
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white border text-gray-500 hover:text-yellow-600 hover:border-yellow-400 transition">
                            ›
                        </button>
                    </div>
                </div>

                {/* Cột phải - video */}
                <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0 px-4 lg:px-10">
                    <div className="relative w-full max-w-[550px] aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={videoThumbnail}
                            alt="Video thumbnail"
                            className="absolute w-full h-full object-cover"
                        />
                        <button className="absolute inset-0 flex justify-center items-center">
                            <span className="bg-yellow-500 w-14 sm:w-16 h-14 sm:h-16 rounded-full text-white text-2xl sm:text-3xl flex justify-center items-center shadow-lg hover:scale-105 transition-transform">
                                ▶
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="w-full flex justify-center bg-[#FAFAFA] py-16 sm:py-20 px-4 sm:px-8">
                <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Hình minh họa */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src={DonateImg}
                            alt="Donate illustration"
                            className="w-[80%] sm:w-[60%] md:w-[70%] lg:w-[80%] object-contain"
                        />
                    </div>

                    {/* Phần nội dung */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        {/* Tiêu đề bo tròn */}
                        <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-6 py-2 text-lg font-semibold inline-block mb-6 shadow-sm self-end">
                            Thống Kê
                        </div>

                        {/* Mô tả */}
                        <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                            Sau đây là những sự yêu thương quyên góp của mọi người dành cho
                            chuyến xe bác ái để mang yêu thương tới mọi người.
                        </p>

                        {/* Dãy chọn kỳ */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {[1, 2, 3, 4, 5].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setSelectedPeriod(period)}
                                    className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${selectedPeriod === period
                                            ? "bg-yellow-400 text-white shadow-md"
                                            : "bg-[#EAF8FF] text-gray-700 hover:bg-yellow-100"
                                        }`}
                                >
                                    Kỳ {period}
                                </button>
                            ))}
                        </div>

                        {/* Thống kê */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            {/* Tiền thu được */}
                            <div className="bg-[#FFF8E1] border border-yellow-300 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                <div className="text-sky-600 text-4xl font-bold mb-2">＄</div>
                                <h4 className="text-sky-600 font-semibold mb-2">Tiền Thu Được</h4>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    {current.money}
                                </p>
                            </div>

                            {/* Hiện vật quyên góp */}
                            <div className="bg-[#FFF8E1] border border-yellow-300 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition">
                                <div className="text-sky-600 text-4xl font-bold mb-2">🎁</div>
                                <h4 className="text-sky-600 font-semibold mb-2">
                                    Hiện Vật Quyên Góp
                                </h4>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    {current.items}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= THÀNH VIÊN ================= */}
            <section className="w-full flex justify-center bg-white py-16 sm:py-20 px-4 sm:px-8">
                <div className="w-full max-w-[1280px] text-center">
                    <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg font-semibold inline-block mb-8">
                        Thành viên
                    </div>

                    <p className="max-w-xl mx-auto text-gray-600 text-base sm:text-lg mb-10">
                        Mỗi thành viên là một mảnh ghép quan trọng, cùng nhau lan tỏa yêu thương.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "Jessie Hoppe", role: "Tình nguyện viên", img: memberImages[0] },
                            { name: "Jacob Jones", role: "Điều phối viên", img: memberImages[1] },
                            { name: "Esther Howard", role: "Truyền thông", img: memberImages[2] },
                        ].map((m, i) => (
                            <div key={i} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
                                <img src={m.img} alt={m.name} className="w-full h-64 object-cover" />
                                <div className="p-5">
                                    <h4 className="font-semibold text-lg">{m.name}</h4>
                                    <p className="text-sm text-gray-500">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= GÓP Ý ================= */}
            <section className="w-full flex justify-center py-16 sm:py-20 px-4 sm:px-8 bg-white">
                <div className="w-full max-w-[1280px] text-center">
                    <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg font-semibold inline-block">
                        Góp ý
                    </div>

                    <p className="max-w-xl mx-auto text-gray-600 mt-6 mb-6 text-base sm:text-lg">
                        Mong muốn được đồng hành và đóng góp một phần nhỏ, hãy gửi chia sẻ chân thành về website và hoạt động nhé.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
                        <input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            className="px-4 py-2 border rounded-lg sm:rounded-l-lg sm:rounded-r-none w-64 focus:outline-none"
                        />
                        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-yellow-600">
                            Gửi
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
