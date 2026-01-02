import { DataResponse, PaginationResponse } from "./base_response.type";

// Trạng thái đăng ký tham gia buổi (session)
export enum RegistrationStatus {
  PENDING = "PENDING",     // Chờ duyệt
  APPROVED = "APPROVED",   // Đã duyệt
  REJECTED = "REJECTED",   // Bị từ chối
  CANCELLED = "CANCELLED", // TNV hủy
  ATTENDED = "ATTENDED",   // Đã điểm danh
  ABSENT = "ABSENT",       // Vắng (đã duyệt nhưng không đến)
}

// Loại thành viên trong chiến dịch
export enum ParticipantRole {
  VOLUNTEER = "VOLUNTEER",     // Tình nguyện viên thông thường
  COORDINATOR = "COORDINATOR", // Điều phối viên (có quyền duyệt)
  LEADER = "LEADER",           // Trưởng nhóm
}

// Giao dịch điểm danh (check-in)
export interface AttendanceRecord {
  sessionId: string;
  sessionTitle: string;
  checkInAt: string;     // ISO datetime
  status: "present" | "late" | "absent";
  note?: string;
}

// Thông tin đăng ký tham gia 1 buổi cụ thể
export interface SessionRegistration {
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  status: RegistrationStatus;
  appliedAt: string;        // Thời điểm đăng ký
  reviewedAt?: string;      // Thời điểm duyệt/từ chối
  reviewedBy?: string;      // ID người duyệt
  rejectedReason?: string;
  attended?: boolean;       // Đã điểm danh chưa
}

// Thành viên trong chiến dịch
export interface ParticipantResource {
  id: string; 
  userId?: string;                    // ID người dùng (userId)
  campaignId?: string;
  sessionId?: string;
  applyReason?: string;

  fullName?: string;
  email?: string;
  phone?: string;
  avatar?: string;

  role?: ParticipantRole;         // Vai trò trong chiến dịch
  joinedAt?: string;              // Thời điểm tham gia chiến dịch

  // Thống kê tham gia
  totalSessions?: number;         // Tổng số buổi đã đăng ký
  approvedSessions?: number;
  attendedSessions?: number;
  points?: number;                // Điểm tích lũy (nếu có)

  // Danh sách đăng ký các buổi
  registrations?: SessionRegistration[];

  // Lịch sử điểm danh (có thể tách riêng nếu cần)
  attendanceHistory?: AttendanceRecord[];

  // Ghi chú của admin
  adminNote?: string;
}


// Request khi duyệt/từ chối đăng ký
export interface ReviewRegistrationRequest {
  registrationId: string;
  status: RegistrationStatus.APPROVED | RegistrationStatus.REJECTED;
  rejectedReason?: string;
}

// Request phân công nhiệm vụ (assignment)
export interface AssignmentRequest {
  participantId: string;
  sessionId: string;
  task: string; // VD: "Chụp ảnh", "Điều phối", "Hỗ trợ phát quà"
}

// Response types
export interface ParticipantResponse extends DataResponse<ParticipantResource[]> {}
export interface ParticipantDetailResponse extends DataResponse<ParticipantResource> {}
export interface RegistrationResponse extends DataResponse<SessionRegistration[]> {}