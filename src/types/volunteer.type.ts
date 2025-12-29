// src/types/volunteer.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";
import { RegistrationStatus } from "./participant.type";

// Trạng thái tình nguyện viên
export enum VolunteerStatus {
  PENDING = "Chờ duyệt", // Chờ duyệt
  APPROVED = "Đã duyệt", // Đã duyệt
  REJECTED = "Bị từ chối", // Bị từ chối
  LOCKED = "Bị khóa", // Bị khóa
  ACTIVE = "Hoạt động", // Hoạt động
  INACTIVE = "Ngừng hoạt động", // Ngừng hoạt động
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
export interface VolunteerApplication {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  skills?: string;
  availability?: string;
  status: VolunteerStatus;
  apply_resson?: string;
  created_at?: string;
  reviewed_at?: string;
  rejected_reason?: string;
}
// Tình nguyện viên
export interface VolunteerResource {
  adminNote: string | number | readonly string[] | undefined;
  role: string | number | readonly string[] | undefined;
  id: string;
  email: string;
  full_name: string;
  phone: string;
  skills?: string;
  availability?: string;
  status: VolunteerStatus;
  apply_resson?: string;
  created_at?: string;
  reviewed_at?: string;
  rejected_reason?: string;
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
export interface VolunteerApplicationResource {
  id: string;                // applicationId
  userId?: string;           // ✅ thêm (BE trả về)
  email?: string;
  full_name?: string;
  phone?: string;
  status: RegistrationStatus;
  reject_reason?: string | null;
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
export interface VolunteerDetailResponse
  extends DataResponse<VolunteerResource> {}
export interface CreateVolunteerResponse
  extends DataResponse<VolunteerResource> {}
export interface UpdateVolunteerResponse
  extends DataResponse<VolunteerResource> {}
export interface ResetPasswordResponse
  extends DataResponse<{ newPassword: string }> {} // Trả về mật khẩu mới
export interface ReviewVolunteerResponse
  extends DataResponse<VolunteerResource> {}
