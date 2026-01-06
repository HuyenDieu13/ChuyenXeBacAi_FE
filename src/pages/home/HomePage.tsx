import bannerImg from "@/assets/images/Home/banner.png";
import SuMenhImg from "@/assets/images/Home/SuMenh.png";
import DonateImg from "@/assets/images/Home/Donate.png";
import Avatar from "@/assets/images/Home/avatar.jpg";
import SunIcon from "@/assets/images/Home/image 70.png";
import NenTraiPhai from "@/assets/images/Home/Nentraiphai.png";
import React, { useState } from "react";
import videoThumbnail from "@/assets/images/Home/banner.png";
import { GENDER_LABEL, Gender } from "@/enum/gender";
import { CreateVolunteerApplicationRequest } from "@/types/volunteer-application.type";
import { useGetMedialatest } from "@/hooks/media.hooks";
import { useCreateVolunteerApplication } from "@/hooks/volunteer-application.hook";
import { useSubscribeContent } from "@/hooks/finance.hook";
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
    const { data: medialatest } = useGetMedialatest(4);
    const data = [
        { id: 1, money: "120.000.000 VNĐ", items: "10.000 Vật Phẩm" },
        { id: 2, money: "95.500.000 VNĐ", items: "8.200 Vật Phẩm" },
        { id: 3, money: "130.200.000 VNĐ", items: "11.000 Vật Phẩm" },
        { id: 4, money: "110.000.000 VNĐ", items: "9.500 Vật Phẩm" },
        { id: 5, money: "150.000.000 VNĐ", items: "12.300 Vật Phẩm" },
    ];
    const { mutate: createVolunteerApplication, isPending } =
        useCreateVolunteerApplication();
    const { mutate: subscribe, isPending: isSubscribing } = useSubscribeContent();
    const [formData, setFormData] =
        useState<CreateVolunteerApplicationRequest>({
            fullName: "",
            email: "",
            phone: "",
            age: undefined,
            gender: Gender.MALE,
            address: "",
            skills: "",
            availability: "",
            applyReason: "",
        });
    const [subscribeFormData, setSubscribeFormData] = useState({
        email: "",
        consent: true
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === "age") {
                return { ...prev, age: value ? Number(value) : undefined };
            }
            if (name === "gender") {
                return { ...prev, gender: value as Gender };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubscribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSubscribeFormData((p) => ({ ...p, [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            // minimal validation, hook will handle server-side
            return;
        }
        createVolunteerApplication({
            email: formData.email,
            fullName: formData.fullName,
            phone: formData.phone,
            age: formData.age,
            gender: formData.gender,
            address: formData.address,
            skills: (formData as any).skills,
            availability: (formData as any).availability,
            applyReason: (formData as any).applyReason,
        });
    };
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subscribeFormData.email) {
            // minimal validation, hook will handle server-side
            return;
        }
        subscribe({
            email: subscribeFormData.email,
            consent: subscribeFormData.consent,
        });
    };

    const current = data.find((d) => d.id === selectedPeriod)!;

    const feedbacks = [
        {
            name: "Denny Hilguston",
            username: "@denny.hil",
            text: "Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.",
        },
        {
            name: "Denny Hilguston",
            username: "@denny.hil",
            text: "Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.",
        },
    ];

    const feedbackText =
        "Get working experience to work with this amazing team & in future want to work together for bright future projects and also make deposit to freelancer.";

    const fallbackGallery = [
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532634896-26909d0d4b9e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop",
    ];

    const galleryImages: string[] = (() => {
        const list = medialatest || [];
        const urls = (list || []).slice(0, 4).map((m) => m.thumb_url || m.url || (m as any).fileUrl || "");
        // fill to 4 with fallbacks
        const filled = [...urls];
        let i = 0;
        while (filled.length < 4) {
            filled.push(fallbackGallery[i % fallbackGallery.length]);
            i++;
        }
        return filled;
    })();

    return (
        <div className="w-full flex flex-col items-center overflow-x-hidden scroll-smooth" >
            {/* ================= HERO ================= */}
            <section
                className="relative w-full min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${bannerImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay nhẹ để làm nổi bật chữ */}
                <div className="absolute inset-0 bg-white/30 sm:bg-white/20"></div>

                {/* Nội dung chữ */}
                <div className="relative z-10 flex flex-col items-center text-center text-[#3b2e13] px-4 sm:px-8">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)] leading-tight mb-4">
                        Chuyến xe
                        <br />
                        <span className="text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                            BÁC ÁI
                        </span>
                    </h1>

                    <button className="mt-6 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base sm:text-lg lg:text-xl px-8 sm:px-10 py-3 sm:py-4 shadow-lg transition">
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
            {/* ================= ẢNH ĐÁNG NHỚ ================= */}

            <section className="w-full flex justify-center bg-white py-16 sm:py-20 px-4 sm:px-8">
                <div className="w-full max-w-[1100px] flex flex-col">
                    {/* Tiêu đề */}
                    <div className="flex justify-end mb-10">
                        <div className="bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-6 py-2 text-base sm:text-lg font-semibold shadow-sm">
                            Ảnh đáng nhớ
                        </div>
                    </div>

                    {/* Grid ảnh kiểu gallery (dùng medialatest khi có) */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-4 sm:gap-6">
                        {/* Ảnh to (chiếm 2 hàng) */}
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={galleryImages[0]}
                                alt="Ảnh đáng nhớ lớn"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {(galleryImages || []).slice(1).map((src, idx) => (
                            <div key={idx} className="rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={src}
                                    alt={`Ảnh nhỏ ${idx + 1} `}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>




            {/* ================= VIDEO CLIP ================= */}
            <section className="w-full bg-[#DFF4FF] py-16 sm:py-20 px-4 sm:px-8">
                <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Cột trái - nội dung */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                        {/* Tiêu đề */}
                        <span className="inline-flex w-fit max-w-max flex-none bg-white border-2 border-yellow-500 text-yellow-700 rounded-full px-6 py-2 text-lg font-heading mb-6 shadow-sm">
                            Video Clip
                        </span>



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
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={videoThumbnail}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute inset-0 flex justify-center items-center">
                                <span className="bg-yellow-500 w-14 sm:w-16 h-14 sm:h-16 rounded-full text-white text-2xl sm:text-3xl flex justify-center items-center shadow-lg hover:scale-105 transition-transform">
                                    ▶
                                </span>
                            </button>
                        </div>
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
                                    className={`px - 5 py - 2 rounded - full text - sm sm: text - base font - semibold transition - all duration - 300 ${selectedPeriod === period
                                        ? "bg-yellow-400 text-white shadow-md"
                                        : "bg-[#EAF8FF] text-gray-700 hover:bg-yellow-100"
                                        } `}
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

            <section className="relative w-full overflow-hidden">
                {/* Tiêu đề */}
                <div className="text-center py-16">
                    <div className="inline-block border-2 border-yellow-400 px-6 py-2 rounded-full bg-white shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-heading text-[#5c4a1e]">
                            Thành viên nói gì nè?
                        </h2>
                    </div>
                </div>

                {/* 3 Cột nền riêng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[80vh]">
                    {/* Cột trái */}
                    <div
                        className="flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat px-8 py-20"
                        style={{ backgroundImage: `url(${NenTraiPhai})` }}
                    >
                        <h3 className="font-semibold mb-3 text-[#333] text-lg">
                            Modern look & trending design
                        </h3>
                        <p className="text-gray-700 text-sm mb-6 max-w-[380px]">{feedbackText}</p>
                        <div className="flex items-center justify-center gap-3">
                            <img
                                src={Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="text-left">
                                <p className="font-semibold text-gray-800">Denny Hilguston</p>
                                <p className="text-sm text-gray-500">@denny.hil</p>
                            </div>
                        </div>
                    </div>

                    {/* Cột giữa */}
                    {/* Cột giữa (dùng màu nền thay vì ảnh) */}
                    <div
                        className="flex flex-col items-center justify-center text-center px-8 py-20"
                        style={{ backgroundColor: "#FFB800" }}
                    >


                        <img src={SunIcon} alt="Sun" className=" mb-6" />
                        <h3 className="font-semibold text-lg text-[#4a3b1a] mb-2">
                            Modern look & trending design
                        </h3>
                        <p className="text-[#4a3b1a] text-sm mb-6 leading-relaxed max-w-[380px]">
                            {feedbackText}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div className="text-left">
                                <p className="font-semibold text-[#4a3b1a]">Denny Hilguston</p>
                                <p className="text-sm text-white/80">@denny.hil</p>
                            </div>
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div
                        className="flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat px-8 py-20"
                        style={{ backgroundImage: `url(${NenTraiPhai})` }}
                    >
                        <h3 className="font-semibold mb-3 text-[#333] text-lg">
                            Modern look & trending design
                        </h3>
                        <p className="text-gray-700 text-sm mb-6 max-w-[380px]">{feedbackText}</p>
                        <div className="flex items-center justify-center gap-3">
                            <img
                                src={Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="text-left">
                                <p className="font-semibold text-gray-800">Denny Hilguston</p>
                                <p className="text-sm text-gray-500">@denny.hil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ĐĂNG KÝ THÀNH VIÊN ================= */}
            <section className="w-full flex justify-center py-20 px-4 sm:px-8 bg-[#EAF8FF]">
                <div className="w-full max-w-[900px] bg-white rounded-3xl shadow-lg p-10 text-center">
                    {/* Tiêu đề */}
                    <div className="inline-block border-2 border-yellow-400 px-6 py-2 rounded-full bg-white shadow-sm mb-8">
                        <h2 className="text-xl sm:text-2xl font-heading text-[#5c4a1e]">
                            Đăng ký trở thành thành viên
                        </h2>
                    </div>

                    {/* Mô tả */}
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Hãy cùng chúng tôi lan tỏa yêu thương trên mỗi hành trình.
                        Điền thông tin bên dưới để tham gia đội ngũ tình nguyện viên nhé 💛
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
                    >
                        {/* Họ tên */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Họ và tên</label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* SĐT */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Số điện thoại</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-full px-5 py-3"
                            />
                        </div>

                        {/* Tuổi */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Tuổi</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age ?? ""}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-full px-5 py-3"
                            />
                        </div>

                        {/* Giới tính */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Giới tính</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-full px-5 py-3"
                            >
                                {Object.values(Gender).map((g) => (
                                    <option key={g} value={g}>
                                        {GENDER_LABEL[g]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Địa chỉ */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium">Địa chỉ</label>
                            <input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-full px-5 py-3"
                            />
                        </div>

                        {/* Kỹ năng */}
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-gray-700 font-medium">Kỹ năng</label>
                            <input
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="VD: giao tiếp, tổ chức, chụp ảnh..."
                                className="border border-gray-300 rounded-full px-5 py-3"
                            />
                        </div>

                        {/* Thời gian rảnh */}
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-gray-700 font-medium">Thời gian có thể tham gia</label>
                            <input
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                placeholder="VD: cuối tuần, buổi tối..."
                                className="border border-gray-300 rounded-full px-5 py-3"
                            />
                        </div>

                        {/* Lý do */}
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <label className="text-gray-700 font-medium">
                                Lý do muốn tham gia
                            </label>
                            <textarea
                                name="applyReason"
                                value={formData.applyReason}
                                onChange={handleChange}
                                rows={4}
                                className="border border-gray-300 rounded-2xl px-5 py-3 resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="sm:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-10 py-3 rounded-full shadow-md disabled:opacity-60"
                            >
                                {isPending ? "Đang gửi..." : "Gửi đăng ký"}
                            </button>
                        </div>
                    </form>

                </div>
            </section>
            {/* ================= GÓP Ý ================= */}
            <section className="w-full flex justify-center py-16 sm:py-20 px-4 sm:px-8 bg-white">
                <div className="w-full max-w-[1000px]">
                    <div className="bg-[#8DD4F7] rounded-3xl shadow-lg py-12 px-6 sm:px-12 text-center text-white">
                        {/* Tiêu đề */}
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Góp ý</h2>

                        {/* Mô tả */}
                        <p className="max-w-2xl mx-auto text-white/90 text-base sm:text-lg leading-relaxed mb-10">
                            Mong muốn được đồng hành và đóng góp một phần nhỏ, mình xin gửi vài chia sẻ
                            chân thành về website và hoạt động hiện tại, hy vọng sẽ hữu ích trên hành trình
                            lan tỏa yêu thương.
                        </p>

                        {/* Form góp ý */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập Email của bạn"
                                value={subscribeFormData.email}
                                onChange={handleSubscribeChange}
                                className="px-6 py-3 w-72 sm:w-96 rounded-full sm:rounded-l-full sm:rounded-r-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-400"
                            />
                            <button
                                className="bg-white text-[#8DD4F7] px-8 py-3 font-semibold rounded-full sm:rounded-r-full sm:rounded-l-none hover:bg-white/90 transition"
                                onClick={handleSubscribe}
                                disabled={isSubscribing}
                            >
                                {isSubscribing ? "Đang gửi..." : "Gửi"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
