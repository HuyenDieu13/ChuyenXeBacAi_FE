// src/pages/admin/campaigns/CampaignDetail.tsx
import React, { useMemo, useState } from "react";
import {
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  FileText,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Wallet,
} from "lucide-react";

import { useCampaignById } from "@/hooks/campaign.hook";

const tabs = [
  { key: "sessions", label: "Buổi hoạt động", icon: Calendar },
  { key: "participants", label: "Thành viên", icon: Users },
  { key: "finance", label: "Quỹ", icon: Wallet },
  { key: "posts", label: "Bài đăng", icon: FileText },
];

const PLACEHOLDER =
  "https://placehold.co/1200x500?text=Campaign+Cover";

const CampaignDetailPage: React.FC = () => {
  // ✅ Hooks luôn gọi ở top-level
  const { id } = useParams({ from: "/admin/campaigns/$id" });
  const navigate = useNavigate();
  const location = useLocation();

  const { data: campaign, isLoading, isError } = useCampaignById(id);

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ banners chuẩn hóa (nếu bạn chỉ có cover_url thì coi như 1 ảnh)
  const banners = useMemo(() => {
    const list: string[] = [];
    if (campaign?.cover_url) list.push(campaign.cover_url);
    // sau này nếu có media_assets thì push thêm ở đây
    return list;
  }, [campaign]);

  const safeBanners = banners.length > 0 ? banners : [PLACEHOLDER];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % safeBanners.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + safeBanners.length) % safeBanners.length);

  // ✅ Active tab
  const currentPath = location.pathname;
  const activeTabKey =
    tabs.find((tab) => currentPath.includes(`/campaigns/${id}/${tab.key}`))
      ?.key || "";

  const goToTab = (key: string) => {
    navigate({
      to: `/admin/campaigns/$id/${key}`,
      params: { id },
    });
  };

  // ✅ Return sau khi hooks đã được gọi
  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Đang tải chiến dịch...
      </div>
    );
  }

  if (isError || !campaign) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        Không tìm thấy chiến dịch
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-6 pb-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate({ to: "/admin/campaigns" })}
          className="flex items-center gap-2 text-gray-600 hover:text-[#355C7D] text-sm"
        >
          <ArrowLeft size={18} /> Quay lại
        </button>

        <h1 className="text-2xl font-bold text-[#355C7D]">
          {campaign.title}
        </h1>

        <button
          onClick={() =>
            navigate({ to: `/admin/campaigns/form/$id`, params: { id } })
          }
          className="flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:bg-[#26415D] text-white text-sm rounded-full transition"
        >
          <Edit3 size={16} /> Chỉnh sửa
        </button>
      </div>

      {/* INFO CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Time */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Calendar size={20} className="text-[#355C7D]" />
            <span className="text-xs text-gray-500">Thời gian</span>
            <p className="font-semibold text-base">
              {campaign.start_date
                ? new Date(campaign.start_date).toLocaleDateString("vi-VN")
                : "—"}{" "}
              →{" "}
              {campaign.end_date
                ? new Date(campaign.end_date).toLocaleDateString("vi-VN")
                : "—"}
            </p>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <MapPin size={20} className="text-[#355C7D]" />
            <span className="text-xs text-gray-500">Địa điểm</span>
            <p className="font-semibold text-base">
              {campaign.location || "Chưa xác định"}
            </p>
          </div>

          {/* Fund */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Wallet size={20} className="text-[#355C7D]" />
            <span className="text-xs text-gray-500">Quỹ mục tiêu</span>
            <p className="font-bold text-lg text-green-600">
              {(campaign.goal_amount ?? 0).toLocaleString("vi-VN")}₫
            </p>
          </div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="relative h-96">
          <img
            src={safeBanners[currentSlide]}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER;
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ImageIcon size={26} /> Ảnh chiến dịch
            </h3>
            <p className="text-sm opacity-90 mt-1">
              {currentSlide + 1} / {safeBanners.length}
            </p>
          </div>

          {safeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur p-2 rounded-full text-white transition"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur p-2 rounded-full text-white transition"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabKey === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => goToTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition
                ${
                  isActive
                    ? "border-b-2 border-[#355C7D] text-[#355C7D] bg-blue-50"
                    : "text-gray-600 hover:text-[#355C7D] hover:bg-gray-50"
                }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow-sm border min-h-[500px] p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default CampaignDetailPage;
