// src/types/campaign.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";

// Trạng thái chiến dịch
export enum CampaignStatus {
  DRAFT = "DRAFT",           // Nháp
  PUBLISHED = "PUBLISHED",   // Đã công khai
  ONGOING = "ONGOING",       // Đang diễn ra
  COMPLETED = "COMPLETED",   // Hoàn thành
  CANCELLED = "CANCELLED",   // Đã hủy
}

export interface CampaignResource {
  id: string;
  title: string;
  description: string;

  startDate: string;         // ISO date string
  endDate: string;           // ISO date string
  location?: string;

  goalAmount: number;        // Số tiền mục tiêu
  collectedAmount: number;   // Số tiền đã quyên góp

  goalVolunteers?: number;   // Số TNV mục tiêu (tùy chọn)
  registeredVolunteers?: number; // Số TNV đã đăng ký

  status: CampaignStatus;
  createdAt: string;         // ISO datetime
  updatedAt?: string;

  // Media
  banner?: string;           // Ảnh bìa chính (có thể để deprecated)
  banners?: string[];        // Bộ sưu tập ảnh (ưu tiên dùng cái này)

  // Thống kê nhanh (tùy chọn, có thể tính từ backend)
  totalSessions?: number;
  totalTransactions?: number;
}

// Request tạo chiến dịch mới
export interface CreateCampaignRequest {
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;

  goalAmount?: number;
  goalVolunteers?: number;

  banners?: string[];        // Upload nhiều ảnh
}

// Request cập nhật chiến dịch (partial)
export interface UpdateCampaignRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  goalAmount?: number;
  goalVolunteers?: number;
  banners?: string[];
}

// Request thay đổi trạng thái
export interface UpdateCampaignStatusRequest {
  status: CampaignStatus;
}

// Response types
export interface CampaignResponse extends DataResponse<CampaignResource> {}
export interface CampaignListResponse extends DataResponse<CampaignResource[]> {}
export interface CampaignPaginatedResponse extends PaginationResponse<CampaignResource[]> {}
export interface CreateCampaignResponse extends DataResponse<CampaignResource> {}
export interface UpdateCampaignResponse extends DataResponse<CampaignResource> {}