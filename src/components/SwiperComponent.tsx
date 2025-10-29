import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface CustomSwiperProps<T> {
    /** Mảng dữ liệu */
    items: T[];
    /** Hàm render từng slide */
    renderSlide: (item: T, index: number) => React.ReactNode;
    /** Số slide hiển thị mỗi trang */
    slidesPerView?: number;
    /** Có autoplay hay không */
    autoplay?: boolean;
    /** Class riêng cho Swiper (nếu cần) */
    className?: string;
    /** Tên prefix để tránh trùng class navigation */
    navId?: string;
    breakpoints?: Record<number, { slidesPerView: number }>;
}

const CustomSwiper = <T,>({
    items,
    renderSlide,
    slidesPerView = 1,
    autoplay = true,
    className = "",
    navId = "default",
    breakpoints = {},
}: CustomSwiperProps<T>) => {
    return (
        <div className={`relative w-full ${className}`}>
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{
                    el: `.swiper-pagination-${navId}`,
                    clickable: true,
                }}
                navigation={{
                    prevEl: `.swiper-button-prev-${navId}`,
                    nextEl: `.swiper-button-next-${navId}`,
                }}
                autoplay={autoplay ? { delay: 4000 } : false}
                spaceBetween={20}
                slidesPerView={slidesPerView}
                breakpoints={breakpoints}
                loop
                className="pb-12"
            >
                {items.map((item, i) => (
                    <SwiperSlide key={i}>{renderSlide(item, i)}</SwiperSlide>
                ))}

                {/* Hàng nút và pagination */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-3 sm:gap-4 px-4 py-2 bg-transparent rounded-lg">
                        {/* Nút trái */}
                        <div
                            className={`
                                swiper-button-prev-${navId} flex items-center justify-center
                                w-12 h-8 sm:w-20 sm:h-12 rounded-full bg-gray-200 text-gray-600
                                hover:bg-yellow-400 hover:text-white transition-all duration-300 cursor-pointer
                            `}
                        >
                            <ChevronLeft size={20} />
                        </div>

                        {/* Pagination giữa hai nút */}
                        <div className={`swiper-pagination-${navId} !static flex justify-center items-center w-[60px]`} />

                        {/* Nút phải */}
                        <div
                            className={`
                                swiper-button-next-${navId} flex items-center justify-center
                                w-12 h-8 sm:w-20 sm:h-12 rounded-full bg-gray-200 text-gray-600
                                hover:bg-yellow-400 hover:text-white transition-all duration-300 cursor-pointer
                            `}
                        >
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>
            </Swiper>
        </div>
    );
};

export default CustomSwiper;
