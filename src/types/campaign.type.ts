// src/types/campaign.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";

import { CampaignStatus } from "@/enum/status.enum";

export interface CampaignResource {
  id: string;
  title: string;
  // description: string;

  // startDate: string;         // ISO date string
  // endDate: string;           // ISO date string
  location?: string;

  goal_amount: number;        // Số tiền mục tiêu
  collected_amount: number;   // Số tiền đã quyên góp

  // goalVolunteers?: number;   // Số TNV mục tiêu (tùy chọn)
  // registeredVolunteers?: number; // Số TNV đã đăng ký

  status: CampaignStatus;
  // createdAt: string;         // ISO datetime
  // updatedAt?: string;
  cover_url?: string;      // Ảnh bìa chiến dịch
}

// Request tạo chiến dịch mới
export interface CreateCampaignRequest {
  title: string;
  description: string;
  location?: string;
  goalAmount?: number;
  startDate?: string;         // ISO date string
  endDate?: string;           // ISO date string
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
export type CampaignResponse = CampaignResource[]
export type CampaignDetailResponse = CampaignResource;
