// src/types/volunteer.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";

// Trạng thái tình nguyện viên
export enum VolunteerStatus {
  PENDING = "PENDING",     // Chờ duyệt
  APPROVED = "APPROVED",   // Đã duyệt
  REJECTED = "REJECTED",   // Bị từ chối
  LOCKED = "LOCKED",       // Bị khóa
  ACTIVE = "ACTIVE",       // Hoạt động
  INACTIVE = "INACTIVE",   // Ngừng hoạt động
}

// Vai trò tình nguyện viên (nếu cần)
export enum VolunteerRole {
  VOLUNTEER = "VOLUNTEER",
  COORDINATOR = "COORDINATOR",
  LEADER = "LEADER",
}

// Lịch sử tham gia chiến dịch (tùy chọn)
export interface CampaignParticipation {
  campaignId: string;
  campaignTitle: string;
  joinedAt: string;
  sessionsAttended: number;
  pointsEarned: number;
}

// Tình nguyện viên
export interface VolunteerResource {
  id: string;

  fullName: string;
  email: string;
  phone: string;
  avatar?: string;

  status: VolunteerStatus;
  role: VolunteerRole;

  joinedAt: string;
  lastActive?: string;

  campaigns: CampaignParticipation[]; // Lịch sử tham gia chiến dịch

  points: number; // Điểm tích lũy
  adminNote?: string; // Ghi chú admin
}

// Request tạo tình nguyện viên mới
export interface CreateVolunteerRequest {
  fullName: string;
  email: string;
  phone: string;
  role?: VolunteerRole;
}

// Request cập nhật tình nguyện viên
export interface UpdateVolunteerRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role?: VolunteerRole;
  status?: VolunteerStatus;
  adminNote?: string;
}

// Request cấp lại mật khẩu
export interface ResetVolunteerPasswordRequest {
  volunteerId: string;
}

// Request duyệt/từ chối tình nguyện viên chờ
export interface ReviewVolunteerRequest {
  status: VolunteerStatus.APPROVED | VolunteerStatus.REJECTED;
  rejectedReason?: string;
}

// Response types
export interface VolunteerResponse extends DataResponse<VolunteerResource[]> {}
export interface VolunteerDetailResponse extends DataResponse<VolunteerResource> {}
export interface CreateVolunteerResponse extends DataResponse<VolunteerResource> {}
export interface UpdateVolunteerResponse extends DataResponse<VolunteerResource> {}
export interface ResetPasswordResponse extends DataResponse<{ newPassword: string }> {} // Trả về mật khẩu mới
export interface ReviewVolunteerResponse extends DataResponse<VolunteerResource> {}