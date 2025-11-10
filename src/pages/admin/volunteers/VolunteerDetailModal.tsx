import React from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { demoVolunteers } from "./volunteerData";
import {
  ArrowLeft,
  Mail,
  Phone,
  Award,
  CalendarDays,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import avatarDefault from "@/assets/images/Home/avatar.jpg";

const VolunteerDetailModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });

  const volunteer = demoVolunteers.find((v) => v.id === id);

  if (!volunteer) {
    return (
      <div className="p-10 text-center text-gray-500">
        Không tìm thấy tình nguyện viên.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate({ to: "/admin/volunteers" })}
          className="flex items-center text-[#355C7D] hover:underline text-sm"
        >
          <ArrowLeft size={18} className="mr-2" /> Quay lại danh sách
        </button>
        <h2 className="text-xl font-bold text-[#355C7D]">
          Chi tiết tình nguyện viên
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          <img
            src={volunteer.avatar || avatarDefault}
            alt={volunteer.name}
            className="w-32 h-32 rounded-full border-4 border-[#355C7D]/20"
          />
          <span className="font-semibold text-lg text-[#355C7D]">
            {volunteer.name}
          </span>
          <span className="text-gray-500 text-sm">{volunteer.email}</span>

          <div className="mt-3 text-center">
            {volunteer.status === "ACTIVE" && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs">
                <CheckCircle size={14} /> Đang hoạt động
              </span>
            )}
            {volunteer.status === "PENDING" && (
              <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs">
                <Clock size={14} /> Chờ duyệt
              </span>
            )}
            {volunteer.status === "INACTIVE" && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs">
                <XCircle size={14} /> Ngưng hoạt động
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold text-[#355C7D] flex items-center gap-2">
              <Mail size={16} /> Email
            </h3>
            <p className="text-gray-600 ml-6">{volunteer.email}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#355C7D] flex items-center gap-2">
              <Phone size={16} /> Số điện thoại
            </h3>
            <p className="text-gray-600 ml-6">{volunteer.phone || "Chưa cập nhật"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#355C7D] flex items-center gap-2">
              <CalendarDays size={16} /> Số buổi đã tham gia
            </h3>
            <p className="text-gray-600 ml-6">{volunteer.joinedSessions} buổi</p>
          </div>
          <div>
            <h3 className="font-semibold text-[#355C7D] flex items-center gap-2">
              <Award size={16} /> Điểm đánh giá
            </h3>
            <p className="text-yellow-500 ml-6">{volunteer.rating.toFixed(1)} / 5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetailModal;
