import React from "react";

interface SideCardProps {
    title: string;
    content: string;
    imgUrl?: string;
    className?: string;
    onClick?: () => void;
}

const SideCard: React.FC<SideCardProps> = ({
    title,
    content,
    imgUrl,
    className,
    onClick,
}) => {
    return (
        <div className={`flex gap-3 items-start hover:bg-gray-50 p-2 cursor-pointer transition-all duration-200 ${className} `} onClick={onClick}>
            <img
                src={imgUrl}
                alt={title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex flex-col justify-between">
                <h4 className="text-sm font-semibold text-[#355C7D] line-clamp-2">
                    {title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">{content}</p>
            </div>
        </div>
    );
};

export default SideCard;
