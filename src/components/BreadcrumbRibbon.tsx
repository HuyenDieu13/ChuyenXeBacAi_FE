// src/components/BreadcrumbRibbon.tsx
import React from "react";
import { Home } from "lucide-react";

type Props = {
    label?: string;
    detailLabel?: string;
    className?: string;
};

const BreadcrumbRibbon: React.FC<Props> = ({
    label = "",
    detailLabel,
    className,
}) => {
    return (
        <div className={`w-full max-w-7xl ${className || ""}`}>
            <div className="flex items-center w-full">
                {/* Ô HOME (ngũ giác mũi phải) */}
                <div
                    className="
                        relative z-10
                        w-10 h-10 flex items-center justify-center
                        bg-[#2f5573] text-white
                        [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]
                    "

                >
                    <Home className="w-5 h-5" />
                </div>

                {/* Nhãn vàng — cắt ngược lại để dính khít */}
                <div
                    className="
                        -ml-[2px]                                                                                                                              
                        h-10 px-4 flex items-center font-semibold
                        text-white bg-[#FFD966]
                        [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%,5%_50%)]
                        shadow-sm
                    "
                >
                    {label}
                </div>
                {detailLabel && (
                    <div
                    className="
                        -ml-[2px]
                        h-10 px-5 flex items-center font-semibold
                        text-white bg-gray-300
                        [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%,5%_50%)]
                        shadow-sm
                    "
                    >
                        {detailLabel}
                    </div>
                )}
                {/* Dải nền kéo dài */}
                <div className="flex-1 h-10 bg-[#E2F9FF] opacity-70" />
            </div>
        </div>
    );
};

export default BreadcrumbRibbon;
