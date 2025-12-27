// src/types/campaign.type.ts
import { DataResponse, PaginationResponse } from "./base_response.type";

import { CampaignStatus } from "@/enum/status.enum";

export interface CampaignResource {
  id: string;
  title: string;
  // description: string;

  start_date: string;         // ISO date string
  end_date: string;           // ISO date string
  location?: string;
  description: string;
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
  coverUrl?: string;        // Ảnh bìa chiến dịch
}


// Request cập nhật chiến dịch (partial)
export interface UpdateCampaignRequest extends CreateCampaignRequest {
  status?: CampaignStatus;
}

// Response types
export type CampaignResponse = CampaignResource[]
export type CampaignDetailResponse = CampaignResource;
export type CreateCampaignResponse = {
  id: string;
  title: string;
}
export type UpdateCampaignResponse = {
  message: string;
  id: string;
}

export type DeleteCampaignResponse = {
  success: boolean;
  note: string;
}