import React from "react";
import banner2Img from "@/assets/images/Home/banner2.png";

interface BannerCustomComponentProps {
    title: string;
    content?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    backgroundColor?: string;
}

const BannerCustomComponent: React.FC<BannerCustomComponentProps> = ({
    title,
    content,
    buttonText,
    onButtonClick,
    backgroundColor = "bg-[#F9FEFF]",
}) => {
    return (
        <section
            className={`w-full h-full ${backgroundColor} flex flex-col md:flex-row items-center justify-between min-h-screen overflow-hidden`}
        >
            {/* === LEFT: TEXT === */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center pl-6 sm:pl-10 md:pl-16 py-10 md:py-20 text-gray-800 ml-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-500 mb-4 drop-shadow-md leading-snug font-body">
                    {title}
                </h2>

                {content && (
                    <p className="text-bold sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
                        {content}
                    </p>
                )}

                {buttonText && (
                    <button
                        onClick={onButtonClick}
                        className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg shadow transition duration-300"
                    >
                        {buttonText}
                    </button>
                )}
            </div>

            {/* === RIGHT: IMAGE === */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                <img
                    src={banner2Img}
                    alt={title}
                    //   className="w-full h-full object-cover object-[center_right] drop-shadow-md"
                    className="w-full h-auto max-w-none object-contain"
                />
            </div>
        </section>
    );
};

export default BannerCustomComponent;
