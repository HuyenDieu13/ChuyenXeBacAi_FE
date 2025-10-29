import React from "react";

interface MainCardProps {
    title: string;
    content: string;
    imgUrl?: string;
    createAt?: string;
    createdBy?: string;
    onClick?: () => void;
}

const MainCard: React.FC<MainCardProps> = ({
    title,
    content,
    imgUrl,
    createAt,
    createdBy,
    onClick,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col" onClick={onClick}>
            {/* Ảnh */}
            <div className="relative w-full h-56">
                <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Nội dung */}
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-[#355C7D] mb-3">{title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
                </div>

                <div className="text-xs text-gray-500 flex justify-between mt-4 border-t pt-2">
                    <span>{createAt}</span>
                    <span>{createdBy}</span>
                </div>
            </div>
        </div>
    );
};

export default MainCard;
